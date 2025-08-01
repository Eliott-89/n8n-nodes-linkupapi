# n8n-nodes-linkupapi

[![npm version](https://badge.fury.io/js/n8n-nodes-linkupapi.svg)](https://badge.fury.io/js/n8n-nodes-linkupapi)

An n8n node for the LINKUP API enabling complete LinkedIn automation.

## 🚀 Installation

### Via n8n Community Nodes

1. In n8n, go to **Settings** > **Community Nodes**
2. Click on **Install a community node**
3. Enter: `n8n-nodes-linkupapi`
4. Click **Install**

### Manual Installation

```bash
npm install n8n-nodes-linkupapi
```

## ⚙️ Configuration

1. **Create a LINKUP account** on [linkupapi.com](https://linkupapi.com)
2. **Get your API key** from the dashboard
3. **Configure credentials** in n8n:
   - LINKUP API Key
   - LinkedIn Email
   - LinkedIn Password
   - Country (optional, FR by default)

## 🔧 Features

### 🔐 Authentication Actions
- **Login to LinkedIn** - LinkedIn authentication
- **Verify security code** - 2FA code validation

### 👤 Profile Actions
- **Get my LinkedIn profile** - Get your profile
- **Extract LinkedIn profile info** - Analyze a public profile
- **Search LinkedIn profiles** - Profile search

### 🏢 Company Actions
- **Search LinkedIn companies** - Company search
- **Get LinkedIn company info** - Detailed company information

### 🤝 Network Actions
- **Send connection request** - Send an invitation
- **Get connections** - Your connections list
- **Accept/Withdraw invitations** - Manage invitations
- **Get network recommendations** - Connection suggestions

### 💬 Message Actions
- **Send LinkedIn message** - Send a message
- **Get message inbox** - Inbox
- **Get conversation messages** - Conversation history

### 📝 Post Actions
- **Create/Comment/React** - Create and interact with posts
- **Get post reactions** - Post reactions
- **Extract comments** - Post comments
- **Search posts** - Post search
- **Get feed** - Get feed

### 🧑‍💼 Recruiter Actions
- **Get candidates** - Candidate list
- **Get candidate CV** - Download CV
- **Manage job posts** - Manage job postings

### 📊 Data Actions
- **Search companies (Data)** - Advanced company search
- **Search profiles (Data)** - Advanced profile search

## 💡 Usage

1. **Add the LINKUP node** to your workflow
2. **Select an operation** (36 available)
3. **Configure parameters** in "Linkup Parameters" (all optional)
4. **Execute** your workflow

### Example: Profile Search

```typescript
Operation: "Search LinkedIn profiles"
Linkup Parameters:
  - Keyword: "developer"
  - Location: "Paris"
  - Company: "google;microsoft"
  - Number of Results: 50
```

## 🛠️ Development

### Prerequisites
- Node.js >= 18.10
- pnpm >= 8.6

### Local Installation
```bash
git clone https://github.com/eliottcerpaud/n8n-nodes-linkupapi.git
cd n8n-nodes-linkupapi
pnpm install
pnpm build
```

### Project Structure
```
├── credentials/LinkupApi.credentials.ts  # Credentials configuration
├── nodes/Linkup/Linkup.node.ts          # Main node
└── nodes/Linkup/linkup.svg              # Icon
```

## 📚 Documentation

See the [official LINKUP documentation](https://docs.linkupapi.com/) for more details on parameters and API responses.

## 🐛 Support

- **Issues** : [GitHub Issues](https://github.com/eliottcerpaud/n8n-nodes-linkupapi/issues)
- **LINKUP Documentation** : [docs.linkupapi.com](https://docs.linkupapi.com/)

## 📄 License

MIT

## 🔄 Changelog

### v1.2.15
- ✅ 36 complete LinkedIn operations
- ✅ Simplified interface (optional parameters)
- ✅ Complete LINKUP API support
- ✅ Automatic credentials management
- ✅ DATA operations added

### v1.1.0
- ✅ First stable version
- ✅ 34 basic operations

---

**Created with ❤️ for the n8n community**