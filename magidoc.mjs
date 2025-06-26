
// magidoc.mjs (updated to include PermissionGroupCreate, staffCreate, and permissionGroups)

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
      queryGenerationFactories: {
        PositiveDecimal: 10.99,
        WeightScalar: 1.5,
        DateTime: '2025-06-18T00:00:00Z',
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
            mutationin's {
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

            ## 9. Product Variant Creation (Updated)
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantCreate(
                input: {
                  product: "UHJvZHVjdDoxNTI="
                  sku: "SKU-123"
                  name: "Variant 1"
                  attributes: [
                    { id: "QXR0cmlidXRlOjE=", values: ["QXR0cmlidXRlVmFsdWU6MQ=="] }
                  ]
                  trackInventory: true
                  weight: 1.5
                  quantityLimitPerCustomer: 5
                  metadata: [{ key: "color", value: "red" }]
                  privateMetadata: [{ key: "internal_id", value: "VAR123" }]
                  externalReference: "EXT-VAR-123"
                }
              ) {
                productVariant {
                  id
                  name
                  sku
                  trackInventory
                  weight
                  quantityLimitPerCustomer
                  metadata { key value }
                  privateMetadata { key value }
                  externalReference
                }
                errors {
                  field
                  message
                  code
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
                    "id": "UHJvZHVjdFZhcmlhbnQ6NDAz",
                    "name": "Variant 1",
                    "sku": "SKU-123",
                    "trackInventory": true,
                    "weight": 1.5,
                    "quantityLimitPerCustomer": 5,
                    "metadata": [{ "key": "color", "value": "red" }],
                    "privateMetadata": [{ "key": "internal_id", "value": "VAR123" }],
                    "externalReference": "EXT-VAR-123"
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 10. Product Variant Deletion
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantDelete(id: "UHJvZHVjdFZhcmlhbnQ6NDAz") {
                productVariant {
                  id
                  name
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantDelete": {
                  "productVariant": {
                    "id": "UHJvZHVjdFZhcmlhbnQ6NDAz",
                    "name": "Variant 1"
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 11. Product Variant Update
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantUpdate(
                id: "UHJvZHVjdFZhcmlhbnQ6MTIz",
                input: {
                  sku: "NEW-SKU-123",
                  name: "Updated Variant Name",
                  trackInventory: true
                }
              ) {
                productVariant {
                  id
                  sku
                  name
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantUpdate": {
                  "productVariant": {
                    "id": "UHJvZHVjdFZhcmlhbnQ6MTIz",
                    "sku": "NEW-SKU-123",
                    "name": "Updated Variant Name"
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 12. Product Variant Reorder
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantReorder(
                productId: "UHJvZHVjdDo1Ng==",
                moves: [
                  { id: "UHJvZHVjdFZhcmlhbnQ6MQ==", sortOrder: 1 },
                  { id: "UHJvZHVjdFZhcmlhbnQ6Mg==", sortOrder: -1 }
                ]
              ) {
                product {
                  id
                  name
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantReorder": {
                  "product": {
                    "id": "UHJvZHVjdDo1Ng==",
                    "name": "Test Product B"
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 13. Product Variant Translation
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantTranslate(
                id: "UHJvZHVjdFZhcmlhbnQ6MQ==",
                languageCode: EN,
                input: {
                  name: "Translated Variant Name"
                }
              ) {
                translation {
                  name
                  language {
                    code
                  }
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantTranslate": {
                  "translation": {
                    "name": "Translated Variant Name",
                    "language": {
                      "code": "EN"
                    }
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 14. Product Variant Bulk Creation
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantBulkCreate(
                product: "UHJvZHVjdDoxMjM=",
                variants: [
                  {
                    sku: "variant-001",
                    attributes: [
                      { id: "QXR0cmlidXRlOjE=", values: ["Red"] }
                    ],
                    stocks: [
                      { warehouse: "V2FyZWhvdXNlOjE=", quantity: 10 }
                    ]
                  },
                  {
                    sku: "variant-002",
                    attributes: [
                      { id: "QXR0cmlidXRlOjE=", values: ["Blue"] }
                    ],
                    stocks: [
                      { warehouse: "V2FyZWhvdXNlOjE=", quantity: 5 }
                    ]
                  }
                ]
              ) {
                productVariants {
                  id
                  name
                  sku
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantBulkCreate": {
                  "productVariants": [
                    {
                      "id": "UHJvZHVjdFZhcmlhbnQ6NDA0",
                      "name": "Variant Red",
                      "sku": "variant-001"
                    },
                    {
                      "id": "UHJvZHVjdFZhcmlhbnQ6NDA1",
                      "name": "Variant Blue",
                      "sku": "variant-002"
                    }
                  ],
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 15. Product Variant Bulk Update
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantBulkUpdate(
                product: "UHJvZHVjdDoxMjM=",
                variants: [
                  {
                    sku: "variant-001",
                    name: "Updated Variant Red",
                    attributes: [
                      { id: "QXR0cmlidXRlOjE=", values: ["Red"] }
                    ]
                  },
                  {
                    sku: "variant-002",
                    name: "Updated Variant Blue",
                    attributes: [
                      { id: "QXR0cmlidXRlOjE=", values: ["Blue"] }
                    ]
                  }
                ]
              ) {
                productVariants {
                  id
                  name
                  sku
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantBulkUpdate": {
                  "productVariants": [
                    {
                      "id": "UHJvZHVjdFZhcmlhbnQ6NDA0",
                      "name": "Updated Variant Red",
                      "sku": "variant-001"
                    },
                    {
                      "id": "UHJvZHVjdFZhcmlhbnQ6NDA1",
                      "name": "Updated Variant Blue",
                      "sku": "variant-002"
                    }
                  ],
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 16. Product Variant Bulk Deletion
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantBulkDelete(
                variants: ["UHJvZHVjdFZhcmlhbnQ6NDA0", "UHJvZHVjdFZhcmlhbnQ6NDA1"]
              ) {
                deletedCount
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantBulkDelete": {
                  "deletedCount": 2,
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 17. Product Variant Bulk Translation
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantBulkTranslate(
                translations: [
                  {
                    id: "UHJvZHVjdFZhcmlhbnQ6NDA0",
                    languageCode: FR,
                    name: "Variante Rouge"
                  },
                  {
                    id: "UHJvZHVjdFZhcmlhbnQ6NDA1",
                    languageCode: FR,
                    name: "Variante Bleue"
                  }
                ]
              ) {
                translations {
                  name
                  language {
                    code
                  }
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantBulkTranslate": {
                  "translations": [
                    {
                      "name": "Variante Rouge",
                      "language": { "code": "FR" }
                    },
                    {
                      "name": "Variante Bleue",
                      "language": { "code": "FR" }
                    }
                  ],
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 18. Product Variant Set Default
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantSetDefault(variantId: "UHJvZHVjdFZhcmlhbnQ6MTIz") {
                product {
                  id
                  defaultVariant {
                    id
                    name
                    sku
                  }
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantSetDefault": {
                  "product": {
                    "id": "UHJvZHVjdDoxMjM=",
                    "defaultVariant": {
                      "id": "UHJvZHVjdFZhcmlhbnQ6MTIz",
                      "name": "Variant 1",
                      "sku": "SKU-123"
                    }
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 19. Product Variant Stocks Creation
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantStocksCreate(
                variantId: "UHJvZHVjdFZhcmlhbnQ6MTIz",
                stocks: [
                  { warehouse: "V2FyZWhvdXNlOjEyMw==", quantity: 100 }
                ]
              ) {
                productVariant {
                  id
                  name
                  stocks {
                    warehouse {
                      name
                    }
                    quantity
                  }
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantStocksCreate": {
                  "productVariant": {
                    "id": "UHJvZHVjdFZhcmlhbnQ6MTIz",
                    "name": "Variant 1",
                    "stocks": [
                      {
                        "warehouse": { "name": "Main Warehouse" },
                        "quantity": 100
                      }
                    ]
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 20. Product Variant Stocks Deletion
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantStocksDelete(
                variantId: "UHJvZHVjdFZhcmlhbnQ6MTIz",
                warehouseIds: ["V2FyZWhvdXNlOjEyMw=="]
              ) {
                productVariant {
                  id
                  name
                  stocks {
                    warehouse {
                      name
                    }
                    quantity
                  }
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantStocksDelete": {
                  "productVariant": {
                    "id": "UHJvZHVjdFZhcmlhbnQ6MTIz",
                    "name": "Variant 1",
                    "stocks": []
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 21. Product Variant Stocks Update
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantStocksUpdate(
                variantId: "UHJvZHVjdFZhcmlhbnQ6MTIz",
                stocks: [
                  {
                    warehouse: "V2FyZWhvdXNlOjEyMw==",
                    quantity: 50,
                    quantityAllocated: 5
                  }
                ]
              ) {
                productVariant {
                  id
                  name
                  stocks {
                    warehouse {
                      id
                      name
                    }
                    quantity
                    quantityAllocated
                  }
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantStocksUpdate": {
                  "productVariant": {
                    "id": "UHJvZHVjdFZhcmlhbnQ6MTIz",
                    "name": "Variant 1",
                    "stocks": [
                      {
                        "warehouse": {
                          "id": "V2FyZWhvdXNlOjEyMw==",
                          "name": "Main Warehouse"
                        },
                        "quantity": 50,
                        "quantityAllocated": 5
                      }
                    ]
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 22. Product Variant Preorder Deactivation
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantPreorderDeactivate(id: "UHJvZHVjdFZhcmlhbnQ6MTIz") {
                productVariant {
                  id
                  name
                  isPreorder
                  preorderGlobalThreshold
                  preorderEndDate
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantPreorderDeactivate": {
                  "productVariant": {
                    "id": "UHJvZHVjdFZhcmlhbnQ6MTIz",
                    "name": "Variant 1",
                    "isPreorder": false,
                    "preorderGlobalThreshold": null,
                    "preorderEndDate": null
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 23. Product Variant Channel Listing Update
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantChannelListingUpdate(
                id: "UHJvZHVjdFZhcmlhbnQ6MTIz",
                input: [
                  {
                    channelId: "Q2hhbm5lbDox",
                    price: 29.99,
                    costPrice: 20.00,
                    priorPrice: 34.99,
                    preorderThreshold: 10
                  }
                ]
              ) {
                productVariant {
                  id
                  channelListings {
                    channel {
                      id
                      name
                    }
                    price {
                      amount
                      currency
                    }
                    costPrice {
                      amount
                      currency
                    }
                    priorPrice {
                      amount
                      currency
                    }
                    preorderThreshold
                  }
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantChannelListingUpdate": {
                  "productVariant": {
                    "id": "UHJvZHVjdFZhcmlhbnQ6MTIz",
                    "channelListings": [
                      {
                        "channel": {
                          "id": "Q2hhbm5lbDox",
                          "name": "Default Channel"
                        },
                        "price": {
                          "amount": 29.99,
                          "currency": "USD"
                        },
                        "costPrice": {
                          "amount": 20.00,
                          "currency": "USD"
                        },
                        "priorPrice": {
                          "amount": 34.99,
                          "currency": "USD"
                        },
                        "preorderThreshold": 10
                      }
                    ]
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 24. Product Variant Reorder Attribute Values
            **Mutation:**
            \`\`\`graphql
            mutation {
              productVariantReorderAttributeValues(
                variantId: "UHJvZHVjdFZhcmlhbnQ6MTIz",
                attributeId: "QXR0cmlidXRlOjE=",
                moves: [
                  { id: "QXR0cmlidXRlVmFsdWU6NDU2", sortOrder: 1 },
                  { id: "QXR0cmlidXRlVmFsdWU6NDU3", sortOrder: -1 }
                ]
              ) {
                productVariant {
                  id
                  attributes {
                    attribute {
                      id
                      name
                    }
                    values {
                      id
                      name
                    }
                  }
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "productVariantReorderAttributeValues": {
                  "productVariant": {
                    "id": "UHJvZHVjdFZhcmlhbnQ6MTIz",
                    "attributes": [
                      {
                        "attribute": {
                          "id": "QXR0cmlidXRlOjE=",
                          "name": "Color"
                        },
                        "values": [
                          { "id": "QXR0cmlidXRlVmFsdWU6NDU2", "name": "Red" },
                          { "id": "QXR0cmlidXRlVmFsdWU6NDU3", "name": "Blue" }
                        ]
                      }
                    ]
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 25. Order Void
            **Mutation:**
            \`\`\`graphql
            mutation {
              orderVoid(id: "T3JkZXI6MTIzNDU=") {
                order {
                  id
                  status
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "orderVoid": {
                  "order": {
                    "id": "T3JkZXI6MTIzNDU=",
                    "status": "VOIDED"
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 26. Order Cancel
            **Mutation:**
            \`\`\`graphql
            mutation {
              orderCancel(id: "T3JkZXI6MTIzNDU=") {
                order {
                  id
                  status
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "orderCancel": {
                  "order": {
                    "id": "T3JkZXI6MTIzNDU=",
                    "status": "CANCELED"
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 27. Order Refund
            **Mutation:**
            \`\`\`graphql
            mutation {
              orderRefund(id: "T3JkZXI6MTIzNDU=", amount: 50.00) {
                order {
                  id
                  status
                  totalRefunded {
                    amount
                    currency
                  }
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "orderRefund": {
                  "order": {
                    "id": "T3JkZXI6MTIzNDU=",
                    "status": "PARTIALLY_REFUNDED",
                    "totalRefunded": {
                      "amount": 50.00,
                      "currency": "USD"
                    }
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 28. Order Update
            **Mutation:**
            \`\`\`graphql
            mutation {
              orderUpdate(id: "T3JkZXI6MTIzNDU=", input: {
                billingAddress: {
                  streetAddress1: "123 Main St",
                  city: "New York",
                  postalCode: "10001",
                  country: "US"
                },
                userEmail: "customer@example.com"
              }) {
                order {
                  id
                  billingAddress {
                    streetAddress1
                    city
                    postalCode
                  }
                  userEmail
                }
                errors {
                  field
                  message
                  code
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "orderUpdate": {
                  "order": {
                    "id": "T3JkZXI6MTIzNDU=",
                    "billingAddress": {
                      "streetAddress1": "123 Main St",
                      "city": "New York",
                      "postalCode": "10001"
                    },
                    "userEmail": "customer@example.com"
                  },
                  "errors": []
                }
              }
            }
            \`\`\`

            ## 29. Permission Group Creation
            **Mutation:**
            \`\`\`graphql
            mutation PermissionGroupCreate($input: PermissionGroupCreateInput!) {
              permissionGroupCreate(input: $input) {
                errors {
                  code
                  field
                  message
                  __typename
                }
                group {
                  id
                  name
                  userCanManage
                  users {
                    id
                    firstName
                    lastName
                    __typename
                  }
                  restrictedAccessToChannels
                  accessibleChannels {
                    id
                    isActive
                    name
                    slug
                    currencyCode
                    defaultCountry {
                      code
                      country
                      __typename
                    }
                    stockSettings {
                      allocationStrategy
                      __typename
                    }
                    __typename
                  }
                  permissions {
                    code
                    name
                    __typename
                  }
                  users {
                    id
                    email
                    firstName
                    isActive
                    lastName
                    avatar(size: 128) {
                      url
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
            }
            \`\`\`
            **Variables:**
            \`\`\`json
            {
              "input": {
                "addPermissions": [
                  "MANAGE_TRANSLATIONS",
                  "MANAGE_TAXES",
                  "MANAGE_STAFF",
                  "MANAGE_SHIPPING",
                  "MANAGE_SETTINGS",
                  "MANAGE_DISCOUNTS",
                  "MANAGE_PRODUCTS",
                  "MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES",
                  "MANAGE_PLUGINS",
                  "MANAGE_PAGES",
                  "MANAGE_PAGE_TYPES_AND_ATTRIBUTES",
                  "MANAGE_ORDERS",
                  "MANAGE_ORDERS_IMPORT",
                  "MANAGE_OBSERVABILITY",
                  "MANAGE_MENUS",
                  "MANAGE_GIFT_CARD",
                  "MANAGE_USERS",
                  "MANAGE_CHECKOUTS",
                  "MANAGE_CHANNELS",
                  "MANAGE_APPS",
                  "HANDLE_CHECKOUTS",
                  "HANDLE_PAYMENTS",
                  "HANDLE_TAXES",
                  "IMPERSONATE_USER"
                ],
                "addUsers": [],
                "name": "Vendor admin",
                "addChannels": [
                  "Q2hhbm5lbDoy",
                  "Q2hhbm5lbDox"
                ],
                "restrictedAccessToChannels": false
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "permissionGroupCreate": {
                  "errors": [],
                  "group": {
                    "id": "R3JvdXA6NjE=",
                    "name": "Vendor admin",
                    "userCanManage": true,
                    "users": [],
                    "restrictedAccessToChannels": false,
                    "accessibleChannels": [
                      {
                        "id": "Q2hhbm5lbDox",
                        "isActive": true,
                        "name": "Default Channel",
                        "slug": "default-channel",
                        "currencyCode": "USD",
                        "defaultCountry": {
                          "code": "US",
                          "country": "United States",
                          "__typename": "Country"
                        },
                        "stockSettings": {
                          "allocationStrategy": "PRIORITIZE_SORTING",
                          "__typename": "StockSettings"
                        },
                        "__typename": "Channel"
                      },
                      {
                        "id": "Q2hhbm5lbDoy",
                        "isActive": true,
                        "name": "EU Channel",
                        "slug": "eu-channel",
                        "currencyCode": "EUR",
                        "defaultCountry": {
                          "code": "DE",
                          "country": "Germany",
                          "__typename": "Country"
                        },
                        "stockSettings": {
                          "allocationStrategy": "PRIORITIZE_SORTING",
                          "__typename": "StockSettings"
                        },
                        "__typename": "Channel"
                      }
                    ],
                    "permissions": [
                      {
                        "code": "MANAGE_TRANSLATIONS",
                        "name": "Manage Translations",
                        "__typename": "Permission"
                      },
                      {
                        "code": "MANAGE_TAXES",
                        "name": "Manage Taxes",
                        "__typename": "Permission"
                      }
                    ],
                    "__typename": "Group"
                  },
                  "__typename": "PermissionGroupCreatePayload"
                }
              }
            }
            \`\`\`

            ## 30. Staff Creation
            **Mutation:**
            \`\`\`graphql
            mutation {
              staffCreate(
                input: {
                  email: "johnpal5@example.com"
                  firstName: "John"
                  lastName: "Pal"
                  isActive: true
                  addGroups: ["R3JvdXA6NjE="]
                }
              ) {
                errors {
                  field
                  message
                }
                user {
                  id
                  email
                  firstName
                  lastName
                  isActive
                  permissionGroups {
                    id
                    name
                  }
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "staffCreate": {
                  "errors": [],
                  "user": {
                    "id": "VXNlcjoxMjM=",
                    "email": "johnpal5@example.com",
                    "firstName": "John",
                    "lastName": "Pal",
                    "isActive": true,
                    "permissionGroups": [
                      {
                        "id": "R3JvdXA6NjE=",
                        "name": "Vendor admin"
                      }
                    ]
                  }
                }
              }
            }
            \`\`\`

            ## 31. Query Permission Groups
            **Query:**
            \`\`\`graphql
            query {
              permissionGroups(first: 50) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
            \`\`\`
            **Response:**
            \`\`\`json
            {
              "data": {
                "permissionGroups": {
                  "edges": [
                    {
                      "node": {
                        "id": "R3JvdXA6NjE=",
                        "name": "Vendor admin"
                      }
                    },
                    {
                      "node": {
                        "id": "R3JvdXA6NjI=",
                        "name": "Store Manager"
                      }
                    }
                  ]
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
