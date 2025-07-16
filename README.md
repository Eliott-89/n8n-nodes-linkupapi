# n8n-nodes-linkup-api

[![NPM Version](https://img.shields.io/npm/v/n8n-nodes-linkup-api)](https://www.npmjs.com/package/n8n-nodes-linkup-api)
[![License](https://img.shields.io/npm/l/n8n-nodes-linkup-api)](https://github.com/Eliott-89/n8n-nodes-linkup/blob/main/LICENSE)

This is an n8n community node that integrates with the LINKUP API for LinkedIn automation and data extraction.

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-linkup-api`
4. Click **Install**

### Manual Installation

To install this node locally:

```bash
npm install n8n-nodes-linkup-api
```

## Prerequisites

- n8n version 0.174.0 or higher
- LINKUP API account and API key
- LinkedIn account credentials

## Setup

1. **Get your LINKUP API key**
   - Sign up at [LINKUP API](https://linkupapi.com/)
   - Get your API key from the dashboard

2. **Configure credentials in n8n**
   - Go to **Credentials** in n8n
   - Create new **LINKUP API** credentials
   - Enter your API key and LinkedIn credentials

## Supported Operations

### Authentication
- **Login**: Authenticate with LinkedIn credentials
- **Verify Code**: Verify security code when required

## Usage

### Basic Login
1. Add the LINKUP node to your workflow
2. Select **Login** operation
3. Configure your credentials
4. Execute the node

### Handle Verification
If LinkedIn requires verification:
1. Use the **Login** operation first
2. Check the response for `requires_verification: true`
3. Use the **Verify Code** operation with the code received by email

## 🚀 Roadmap

### Current Features (v1.0.0)
- ✅ LinkedIn Authentication
- ✅ Security Code Verification

### Coming Soon
- 🔄 Profile Search
- 🔄 Company Search  
- 🔄 Job Search
- 🔄 Connection Management
- 🔄 Message Sending
- 🔄 Post Management

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-endpoint`
3. Commit your changes: `git commit -m 'Add new endpoint'`
4. Push to the branch: `git push origin feature/new-endpoint`
5. Open a Pull Request

## 📦 Development

```bash
# Clone the repository
git clone https://github.com/linkup-api/n8n-nodes-linkup.git
cd n8n-nodes-linkup

# Install dependencies
npm install

# Build the project
npm run build

# Test locally
npm link
```

## API Reference

This node uses the LINKUP API v1. For detailed API documentation, visit [LINKUP API Docs](https://docs.linkupapi.com/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions:
- GitHub Issues: [Report a bug](https://github.com/linkup-api/n8n-nodes-linkup/issues)
- LINKUP API Support: [API Documentation](https://docs.linkupapi.com/)

## Changelog

### 1.0.0
- Initial release
- Login authentication support
- Verification code support