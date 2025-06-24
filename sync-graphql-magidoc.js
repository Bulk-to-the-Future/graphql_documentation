// sync-graphql-magidoc.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { parse, validate, getOperationAST } = require('graphql');
const { buildSchema } = require('graphql');
const { request } = require('graphql-request');
const fs = require('fs-extra');
const path = require('path');

// Configuration
const SALEOR_ENDPOINT = 'http://localhost:8001/graphql/'; // Change to your Saleor endpoint, e.g., 'https://api/graphql'
const PROXY_PORT = 4001; // Proxy server port
const SCHEMA_PATH = './schema.graphqls';
const MAGIDOC_PATH = './magidoc.mjs';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Im5UZUJJd0NndF9wc01obEQzZm1teFZpZndYbGVZc2JxOGxTaFVuQXdpanciLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE3NTA2ODI0NTMsIm93bmVyIjoic2FsZW9yIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2dyYXBocWwvIiwiZXhwIjoxNzUwNjgyNzUzLCJ0b2tlbiI6IlEwYUIzZkZvc2RkcSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6IlZYTmxjam8wTlE9PSIsImlzX3N0YWZmIjp0cnVlfQ.CFHi7Sjng1wOs0RToA9F2Cur0wZYaA4sWa2wR19GbtWp2AFCWp4UDaixi11cEKfs7sCVg_kkH6va_WGi-W_HTmBFvKxMCruqNgwfubPwIdtS6DRh5b7BR7nMlb1ley7pbLNU-1aw5RSJI3_tNpcoFN6rphLVZxdTE-Uh4XPFvPIkNzieRfv7GolKj-ykqWqid_2APXlKU2Dg2yD9yUNuP6FAdrp0kJrrij5xDhdEkNvNLB6MwCPzvDif4A6oDqHxiciL76QrINRyjKyeoeCHWh8gDvOMgaKZRIxuA7lEE1CznLr5smb8x19FhSM1lX4_r5IF2YlAIFaivM1nfXvPxQ'; // Replace with your Saleor JWT token

// Load GraphQL schema
const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf-8');
const schema = buildSchema(schemaContent);

// Helper to extract operation name and type
function getOperationDetails(query) {
  const document = parse(query);
  const operation = getOperationAST(document, null);
  if (!operation) throw new Error('No valid operation found in query');
  return {
    name: operation.name ? operation.name.value : 'UnnamedOperation',
    type: operation.operation, // 'query' or 'mutation'
  };
}

// Helper to check if query/mutation is already documented
function isQueryDocumented(query) {
  const magidocContent = fs.readFileSync(MAGIDOC_PATH, 'utf-8');
  return magidocContent.includes(query);
}

// Helper to append new operation to magidoc.mjs
function appendToMagidoc(query, response, operationDetails) {
  const magidocContent = fs.readFileSync(MAGIDOC_PATH, 'utf-8');
  
  // Extract operations section
  const operationsSectionMatch = magidocContent.match(/content: `([^`]+)`/s);
  if (!operationsSectionMatch) throw new Error('Operations section not found in magidoc.mjs');
  let operationsContent = operationsSectionMatch[1];
  
  // Find the last operation number
  const lastOperationMatch = operationsContent.match(/## (\d+)\. .*/g);
  const lastNumber = lastOperationMatch
    ? parseInt(lastOperationMatch[lastOperationMatch.length - 1].match(/## (\d+)\./)[1])
    : 0;
  const newNumber = lastNumber + 1;
  
  // Format the new operation
  const operationTitle = operationDetails.type === 'mutation'
    ? operationDetails.name
    : operationDetails.name.replace(/^get/i, ''); // Remove 'get' prefix for queries
  const newSection = `
            ## ${newNumber}. ${operationTitle}
            **${operationDetails.type.charAt(0).toUpperCase() + operationDetails.type.slice(1)}:**
            \`\`\`graphql
            ${operationDetails.type} ${operationDetails.name} {
              ${query.trim()}
            }
            \`\`\`
            **Response:**
            \`\`\`json
            ${JSON.stringify(response, null, 2)}
            \`\`\`
`;
  
  // Append new section before the closing backticks
  const updatedOperationsContent = operationsContent.replace(/\n\s*`$/, `${newSection}\n\``);
  const updatedMagidocContent = magidocContent.replace(
    /content: `([^`]+)`/s,
    `content: \`${updatedOperationsContent}\``
  );
  
  // Write updated magidoc.mjs
  fs.writeFileSync(MAGIDOC_PATH, updatedMagidocContent);
  console.log(`Added operation "${operationDetails.name}" to magidoc.mjs as section ${newNumber}`);
}

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Proxy middleware
const proxy = createProxyMiddleware({
  target: SALEOR_ENDPOINT,
  changeOrigin: true,
  selfHandleResponse: true, // Handle response manually
  onProxyReq: (proxyReq, req) => {
    // Add Authorization header if needed
    if (AUTH_TOKEN) {
      proxyReq.setHeader('Authorization', AUTH_TOKEN);
    }
  },
  onProxyRes: async (proxyRes, req, res) => {
    let body = '';
    proxyRes.on('data', (chunk) => {
      body += chunk;
    });
    proxyRes.on('end', async () => {
      try {
        const response = JSON.parse(body);
        
        // Check if response has no errors
        if (!response.errors && response.data) {
          const query = req.body.query;
          
          // Validate query against schema
          const document = parse(query);
          const validationErrors = validate(schema, document);
          if (validationErrors.length > 0) {
            console.log('Query validation failed:', validationErrors);
            res.status(400).json({ errors: validationErrors });
            return;
          }
          
          // Get operation details
          const operationDetails = getOperationDetails(query);
          
          // Check if already documented
          if (!isQueryDocumented(query)) {
            // Send query to Saleor to get response (for documentation)
            const graphqlResponse = await request({
              url: SALEOR_ENDPOINT,
              document: query,
              requestHeaders: AUTH_TOKEN ? { Authorization: AUTH_TOKEN } : {},
            });
            
            // Confirm no errors in response
            if (!graphqlResponse.errors && graphqlResponse.data) {
              appendToMagidoc(query, graphqlResponse, operationDetails);
            }
          }
        }
        
        // Forward response to client
        res.set(proxyRes.headers);
        res.status(proxyRes.statusCode).json(response);
      } catch (error) {
        console.error('Error processing proxy response:', error);
        res.status(500).json({ errors: [{ message: error.message }] });
      }
    });
  },
});

// Use proxy for GraphQL endpoint
app.use('/graphql', proxy);

// Start server
app.listen(PROXY_PORT, () => {
  console.log(`Proxy server running on http://localhost:${PROXY_PORT}/graphql`);
});