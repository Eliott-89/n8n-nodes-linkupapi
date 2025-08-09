# n8n-nodes-linkupapi

🚀 **n8n community node for LINKUP API - LinkedIn automation and data extraction**

[![npm version](https://badge.fury.io/js/n8n-nodes-linkupapi.svg)](https://www.npmjs.com/package/n8n-nodes-linkupapi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)](https://n8n.io)

## 📋 Description

This n8n package provides comprehensive **LinkedIn automation** capabilities via the **Linkup API**. It offers a complete suite of features for profile management, networking, messaging, content creation, and recruitment automation.

## ⚡ Quick Start

### Installation

```bash
npm install n8n-nodes-linkupapi
```

### Configuration

1. Create an account on [LinkupAPI.com](https://linkupapi.com)
2. Read the [API Documentation](https://docs.linkupapi.com/api-reference/introduction)
3. Get your API key from your dashboard
4. Configure the credentials in your n8n workflow

## 🎯 Features

### 🔐 Authentication
- LinkedIn login automation
- Verification code handling
- Session management

### 👤 Profile Management
- Extract profile information
- Search profiles with advanced filters
- Profile enrichment and data enhancement

### 🏢 Company Operations
- Company search and discovery
- Company information extraction
- Employee data extraction
- Decision maker identification

### 🌐 Network Management
- Send connection requests
- Accept/decline invitations
- Manage existing connections
- Network recommendations

### 💬 Messaging
- Send automated messages
- Retrieve conversation history
- Manage inbox operations

### 📝 Content & Posts
- Create and publish posts
- React to content
- Extract post reactions and comments
- Automated engagement

### 🎯 Recruitment
- Candidate search and management
- Job posting automation
- CV extraction
- Recruitment analytics

### 📊 Data Extraction (Signal API)
- Extract post reactions and comments
- Extract profile data and posts
- Company content analysis
- Real-time data collection

## 🔧 Usage Examples

### Basic Authentication
```javascript
// Login to LinkedIn
{
  "resource": "authentication",
  "operation": "login",
  "loginParams": {
    "email": "your-email@example.com",
    "password": "your-password"
  }
}
```

### Profile Search
```javascript
// Search for profiles
{
  "resource": "personApi",
  "operation": "searchProfiles",
  "searchProfilesParams": {
    "query": "Software Engineer",
    "location": "San Francisco",
    "total_results": 50
  }
}
```

### Company Data Extraction
```javascript
// Extract company employees
{
  "resource": "personApi",
  "operation": "extractCompanyEmployees",
  "extractCompanyEmployeesParams": {
    "company_name": "Microsoft",
    "total_results": 100,
    "decision_makers_only": true
  }
}
```

## 📊 API Coverage

This package covers **100% of the Linkup API endpoints**:

- **Authentication**: 2/2 endpoints ✅
- **Profile**: 3/3 endpoints ✅
- **Posts**: 10/10 endpoints ✅
- **Companies**: 2/2 endpoints ✅
- **Network**: 8/8 endpoints ✅
- **Messages**: 3/4 endpoints ✅
- **Recruitment**: 6/6 endpoints ✅
- **Signal**: 6/6 endpoints ✅
- **Data Search**: 7/7 endpoints ✅

## 🛠️ Development

### Prerequisites
- **Node.js**: >= 18.10
- **pnpm**: >= 8.6
- **n8n**: Latest version

### Setup
```bash
# Clone the repository
git clone https://github.com/Eliott-89/n8n-nodes-linkup.git
cd n8n-nodes-linkup

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format
```

### Project Structure
```
n8n-nodes-linkupapi/
├── credentials/              # API credentials configuration
│   └── LinkupApi.credentials.ts
├── nodes/Linkup/            # Main node implementation
│   ├── Linkup.node.ts       # Main node file
│   ├── categories/          # Business logic by category
│   ├── properties/          # n8n properties by category
│   ├── types.ts             # Shared TypeScript types
│   ├── utils.ts             # Utility functions
│   └── linkup.svg           # Node icon
├── dist/                    # Compiled output
├── package.json             # Package configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Documentation
```

## 🔒 Security

- All API communications are secured with HTTPS
- API keys are encrypted and stored securely
- No sensitive data is logged or stored locally
- Compliance with LinkedIn's Terms of Service

## 📚 Documentation

- [API Documentation](https://docs.linkupapi.com/api-reference/introduction)
- [LinkupAPI Website](https://linkupapi.com)
- [n8n Community Nodes](https://n8n.io/integrations)

## 🐛 Issues & Support

- [Report Issues](https://github.com/Eliott-89/n8n-nodes-linkup/issues)
- [Feature Requests](https://github.com/Eliott-89/n8n-nodes-linkup/issues/new?labels=enhancement)
- [Community Support](https://community.n8n.io)

## 📈 Version History

### Current Version: 2.4.19

**Latest Features:**
- ✅ Extract Company Employees functionality
- ✅ Complete API coverage (100%)
- ✅ Enhanced error handling
- ✅ Improved parameter validation
- ✅ Full English documentation

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Eliott Cerpaud**
- GitHub: [@Eliott-89](https://github.com/Eliott-89)
- Project: [n8n-nodes-linkup](https://github.com/Eliott-89/n8n-nodes-linkup)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ for the n8n community**
