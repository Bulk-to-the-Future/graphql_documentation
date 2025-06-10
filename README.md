
# 🛠️ Setup & Run Magidoc for Saleor GraphQL Documentation

## Prerequisites

- Node.js v20+  
- `pnpm` package manager (optional, but recommended)

---

## Step 1: Update Node.js (Recommended: Node.js 20 LTS)

### Using `nvm` (Node Version Manager)

Install `nvm`:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Add to shell profile:
```bash
source ~/.zshrc  # or ~/.bashrc
```

Install & use Node.js 20:
```bash
nvm install 20
nvm use 20
nvm alias default 20
```

### Or, via Homebrew:
```bash
brew install node@20
brew link node@20
```

Verify version:
```bash
node -v  # should output v20.x.x
```

---

## Step 2: Clear Cache & Temporary Files (Optional)

```bash
rm -rf /var/folders/*/*/T/carbon-multi-page@6.2.0
npm cache clean --force
pnpm cache clear
```

---

## Step 3: Generate Documentation

Navigate to your project folder:
```bash
cd /Users/shubhamkulkarni/Documents/saleor-graphql-docs
```

Run the generator:
```bash
npx @magidoc/cli@latest generate
```

If errors occur:
```bash
npx @magidoc/cli@latest generate --stacktrace
```

---

## Step 4: Preview the Documentation

```bash
npx @magidoc/cli@latest preview
```

Open in your browser:  
[http://localhost:3000](http://localhost:3000)

---

## Step 5: Sync Markdown Content (Optional)

Create `update-magidoc.js`:
```js
const fs = require('fs');

const markdownContent = fs.readFileSync('./saleor-api-docs.md', 'utf8');
const magidocContent = fs.readFileSync('./magidoc.mjs', 'utf8');
const updatedMagidoc = magidocContent.replace(
  /content: `[\s\S]*?`(?=\s*},)/,
  `content: \`
${markdownContent}
\``
);
fs.writeFileSync('./magidoc.mjs', updatedMagidoc);
console.log('Updated magidoc.mjs with Markdown content');
```

Run:
```bash
node update-magidoc.js
```

---

## Step 6: Fetch Live Schema (Optional)

Install Rover:
```bash
npm install -g @apollo/rover
```

Download schema from running Saleor server:
```bash
rover graph introspect http://localhost:8000/graphql > schema.graphqls
```

Update `magidoc.mjs`:
```js
introspection: {
  type: 'url',
  url: 'http://localhost:8000/graphql',
  headers: {}
}
```

---

## ✅ Done!

You should now see Saleor GraphQL documentation with:
- Introduction
- Operations (e.g., `tokenCreate`, `productCreate`)
- Schema Types (e.g., `Product`, `PageInfo`)
