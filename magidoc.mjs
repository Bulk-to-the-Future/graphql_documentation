export default {
    introspection: {
      type: 'sdl',
      paths: ['./schema.graphqls'],
    },
    website: {
      template: 'carbon-multi-page',
      output: './docs',
      options: {
        appTitle: 'Saleor GraphQL API Documentation',
        appLogo: 'https://seeklogo.com/images/S/saleor-logo-4A0B0FAD5B-seeklogo.com.png',
        siteMeta: {
          description: 'Documentation for Saleor GraphQL API operations, including queries and mutations.',
          keywords: 'Saleor, GraphQL, API, Documentation',
        },
        pages: [
          {
            title: 'Introduction',
            content: `
              # Saleor GraphQL API Documentation
              Welcome to the Saleor GraphQL API documentation. This guide covers key queries and mutations for interacting with the Saleor platform, designed for future use.
            `,
          },
          {
            title: 'Operations',
            content: `
              # Saleor GraphQL API Operations
              Below are documented queries and mutations for the Saleor API, including examples and responses.
  
              ## 1. Token Creation
              **Mutation:**
              \`\`\`graphql
              mutation {
                tokenCreate(email: "admin@example.com", password: "admin") {
                  token
                  user {
                    id
                    email
                  }
                }
              }
              \`\`\`
              **Response:**
              \`\`\`json
              {
                "data": {
                  "tokenCreate": {
                    "token": "<JWT_TOKEN>",
                    "user": {
                      "id": "VXNlcjo0NQ==",
                      "email": "admin@example.com"
                    }
                  }
                }
              }
              \`\`\`
  
              ## 2. Query Product Types, Categories, and Channels
              **Query:**
              \`\`\`graphql
              query {
                productTypes(first: 3) {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
                categories(first: 3) {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
                channels {
                  id
                  name
                }
              }
              \`\`\`
              **Response:**
              \`\`\`json
              {
                "data": {
                  "productTypes": {
                    "edges": [
                      {"node": {"id": "UHJvZHVjdFR5cGU6MTc=", "name": "Audiobook"}},
                      {"node": {"id": "UHJvZHVjdFR5cGU6MjE=", "name": "Beanies & Scarfs"}},
                      {"node": {"id": "UHJvZHVjdFR5cGU6MQ==", "name": "Default Type"}}
                    ]
                  },
                  "categories": {
                    "edges": [
                      {"node": {"id": "Q2F0ZWdvcnk6MQ==", "name": "Default Category"}},
                      {"node": {"id": "Q2F0ZWdvcnk6MjU=", "name": "Accessories"}},
                      {"node": {"id": "Q2F0ZWdvcnk6MjY=", "name": "Audiobooks"}}
                    ]
                  },
                  "channels": [
                    {"id": "Q2hhbm5lbDoy", "name": "Channel-PLN"},
                    {"id": "Q2hhbm5lbDox", "name": "Default Channel"}
                  ]
                }
              }
              \`\`\`
  
              ## 3. Product Creation
              **Mutation:**
              \`\`\`graphql
              mutation {
                productCreate(input: {
                  name: "Test Product A"
                  slug: "test-product-a"
                  productType: "UHJvZHVjdFR5cGU6MQ=="
                  category: "Q2F0ZWdvcnk6MQ=="
                }) {
                  product {
                    id
                    name
                  }
                  errors {
                    field
                    message
                  }
                }
              }
              \`\`\`
              **Response:**
              \`\`\`json
              {
                "data": {
                  "productCreate": {
                    "product": {
                      "id": "UHJvZHVjdDoxNjU=",
                      "name": "Test Product A"
                    },
                    "errors": []
                  }
                }
              }
              \`\`\`
  
              ## 4. Channel Listing Update
              **Mutation:**
              \`\`\`graphql
              mutation {
                productChannelListingUpdate(
                  id: "UHJvZHVjdDoxNjU=",
                  input: {
                    updateChannels: [
                      {
                        channelId: "Q2hhbm5lbDox",
                        isPublished: true,
                        publicationDate: "2025-06-09",
                        visibleInListings: true,
                        isAvailableForPurchase: true,
                        availableForPurchaseDate: "2025-06-09"
                      }
                    ]
                  }
                ) {
                  product {
                    name
                    channelListings {
                      channel {
                        name
                      }
                      isPublished
                    }
                  }
                  errors {
                    field
                    message
                  }
                }
              }
              \`\`\`
              **Response:**
              \`\`\`json
              {
                "data": {
                  "productChannelListingUpdate": {
                    "product": {
                      "name": "Test Product A",
                      "channelListings": [
                        {
                          "channel": { "name": "Default Channel" },
                          "isPublished": true
                        }
                      ]
                    },
                    "errors": []
                  }
                }
              }
              \`\`\`
  
              ## 5. Product Variant Creation
              **Mutation:**
              \`\`\`graphql
              mutation {
                productVariantCreate(
                  input: {
                    product: "UHJvZHVjdDoxNjU="
                    sku: "TESTSKU-001"
                    name: "Variant 1"
                    attributes: []
                  }
                ) {
                  productVariant {
                    id
                    name
                  }
                  errors {
                    field
                    message
                  }
                }
              }
              \`\`\`
              **Response:**
              \`\`\`json
              {
                "data": {
                  "productVariantCreate": {
                    "productVariant": {
                      "id": "UHJvZHVjdFZhcmlhbnQ6NDAy",
                      "name": "Variant 1"
                    },
                    "errors": []
                  }
                }
              }
              \`\`\`
  
              ## 6. Product Publishing
              **Mutation:**
              \`\`\`graphql
              mutation {
                productChannelListingUpdate(
                  id: "UHJvZHVjdDoxNjU=",
                  input: {
                    updateChannels: [
                      {
                        channelId: "Q2hhbm5lbDox",
                        isPublished: true,
                        visibleInListings: true,
                        publishedAt: "2025-06-09T00:00:00Z"
                      }
                    ]
                  }
                ) {
                  product {
                    id
                    name
                    channelListings {
                      channel {
                        id
                        name
                      }
                      isPublished
                      visibleInListings
                      publishedAt
                    }
                  }
                  errors {
                    field
                    message
                  }
                }
              }
              \`\`\`
              **Response:**
              \`\`\`json
              {
                "data": {
                  "productChannelListingUpdate": {
                    "product": {
                      "id": "UHJvZHVjdDoxNjU=",
                      "name": "Test Product A",
                      "channelListings": [
                        {
                          "channel": {
                            "id": "Q2hhbm5lbDox",
                            "name": "Default Channel"
                          },
                          "isPublished": true,
                          "visibleInListings": true,
                          "publishedAt": "2025-06-09T00:00:00+00:00"
                        }
                      ]
                    },
                    "errors": []
                  }
                }
              }
              \`\`\`
  
              ## 7. Product Update
              **Mutation:**
              \`\`\`graphql
              mutation {
                productUpdate(
                  id: "UHJvZHVjdDoxNjU=",
                  input: {
                    name: "Updated Test Product A"
                  }
                ) {
                  product {
                    id
                    name
                  }
                  errors {
                    field
                    message
                  }
                }
              }
              \`\`\`
              **Response:**
              \`\`\`json
              {
                "data": {
                  "productUpdate": {
                    "product": {
                      "id": "UHJvZHVjdDoxNjU=",
                      "name": "Updated Test Product A"
                    },
                    "errors": []
                  }
                }
              }
              \`\`\`
  
              ## 8. Product Translation
              **Mutation:**
              \`\`\`graphql
              mutation {
                productTranslate(
                  id: "UHJvZHVjdDoxNjU=",
                  languageCode: FR,
                  input: {
                    name: "Produit Test A"
                  }
                ) {
                  product {
                    translation(languageCode: FR) {
                      name
                    }
                  }
                  errors {
                    field
                    message
                  }
                }
              }
              \`\`\`
              **Response:**
              \`\`\`json
              {
                "data": {
                  "productTranslate": {
                    "product": {
                      "translation": {
                        "name": "Produit Test A"
                      }
                    },
                    "errors": []
                  }
                }
              }
              \`\`\`
            `,
          },
        ],
      },
    },
  };