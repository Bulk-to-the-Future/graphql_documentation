const { buildSchema } = require('graphql');
const fs = require('fs');

try {
  const schemaContent = fs.readFileSync('./schema.graphqls', 'utf8');
  buildSchema(schemaContent);
  console.log('Schema is valid!');
} catch (error) {
  console.error('Schema validation failed:', error.message);
}