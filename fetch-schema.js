// fetch-schema.js
const fs = require('fs');
const { getIntrospectionQuery, buildClientSchema, printSchema } = require('graphql');

async function fetchSchema() {
  const introspectionQuery = getIntrospectionQuery();
  
  // *** IMPORTANT: Replace with your actual localhost Saleor GraphQL endpoint ***
  const saleorEndpoint = 'http://localhost:8000/graphql/'; // <<-- Update this line

  const response = await fetch(saleorEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // If your local Saleor requires authentication for introspection,
      // replace 'YOUR_JWT_TOKEN_HERE' with a valid JWT token.
      // Otherwise, you can remove this Authorization header.
      'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE' 
    },
    body: JSON.stringify({ query: introspectionQuery })
  });
  
  const result = await response.json();

  if (result.errors) {
    console.error('Error fetching schema:', result.errors);
    return;
  }

  const schema = buildClientSchema(result.data);
  const sdl = printSchema(schema);
  
  fs.writeFileSync('schema.graphql', sdl);
  console.log('Schema saved to schema.graphql');
}

fetchSchema().catch(console.error);