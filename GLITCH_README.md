# Saleor GraphQL Documentation - Glitch Hosting

This project hosts GraphQL API documentation for the Saleor platform on Glitch.

## 🚀 Quick Start

1. **Fork this project** on Glitch
2. **Wait for dependencies** to install automatically
3. **The app will start** automatically and be available at your Glitch URL

## 📁 Project Structure

- `index.js` - Express server entry point
- `magidoc.mjs` - Documentation generation configuration
- `docs/` - Generated static documentation files
- `schema.graphqls` - GraphQL schema file

## 🔧 Available Scripts

- `npm start` - Start the Express server (runs automatically on Glitch)
- `npm run build` - Regenerate documentation from schema

## 🌐 Accessing Your Documentation

Once deployed on Glitch, your documentation will be available at:
- **Main URL**: `https://your-project-name.glitch.me`
- **Direct docs**: `https://your-project-name.glitch.me/docs/`

## 📝 Features

- **Interactive GraphQL Documentation** - Browse queries, mutations, and types
- **Search Functionality** - Find specific operations quickly
- **Responsive Design** - Works on desktop and mobile
- **Real-time Updates** - Changes are reflected immediately on Glitch

## 🔄 Updating Documentation

To update the documentation:

1. Modify `schema.graphqls` with your latest GraphQL schema
2. Run `npm run build` in the Glitch console
3. The documentation will automatically regenerate

## 🛠️ Customization

Edit `magidoc.mjs` to customize:
- Site title and logo
- Page content and structure
- Styling and branding
- Query examples and responses

## 📚 Documentation Sections

- **Introduction** - Overview of the Saleor GraphQL API
- **Operations** - Common queries and mutations with examples
- **Queries** - Detailed query documentation
- **Mutations** - Detailed mutation documentation
- **Types** - GraphQL type definitions

## 🆘 Troubleshooting

If the app doesn't start:
1. Check the Glitch console for error messages
2. Ensure all dependencies are installed
3. Verify the `docs/` directory exists with generated files
4. Try running `npm run build` to regenerate documentation

## 🔗 Related Links

- [Saleor Documentation](https://docs.saleor.io/)
- [GraphQL Documentation](https://graphql.org/)
- [Magidoc Documentation](https://magidoc.js.org/) 