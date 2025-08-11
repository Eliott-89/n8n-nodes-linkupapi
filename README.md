# n8n-nodes-linkupapi

**Professional n8n community node for LINKUP API - LinkedIn automation and data extraction**

[![npm version](https://badge.fury.io/js/n8n-nodes-linkupapi.svg)](https://www.npmjs.com/package/n8n-nodes-linkupapi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)](https://n8n.io)

## Overview

This n8n package provides comprehensive LinkedIn automation capabilities through the Linkup API. It delivers a complete suite of features for profile management, networking, messaging, content creation, and recruitment automation, enabling businesses to streamline their LinkedIn operations at scale.

## Installation

Install the package via npm:

```bash
npm install n8n-nodes-linkupapi
```

## Configuration

1. Create an account on [LinkupAPI.com](https://linkupapi.com)
2. Read the [API Documentation](https://docs.linkupapi.com/api-reference/introduction)
3. Get your API key from your dashboard
4. Configure the credentials in your n8n workflow

## Features

### Authentication
- LinkedIn login automation
- Verification code handling
- Session management

### Profile Management
- Extract profile information
- Search profiles with advanced filters
- Profile enrichment and data enhancement

### Company Operations
- Company search and discovery
- Company information extraction
- Employee data extraction
- Decision maker identification

### Network Management
- Send connection requests
- Accept/decline invitations
- Manage existing connections
- Network recommendations

### Messaging
- Send automated messages
- Retrieve conversation history
- Manage inbox operations

### Content & Posts
- Create and publish posts
- React to content
- Extract post reactions and comments
- Automated engagement

### Recruitment
- Candidate search and management
- Job posting automation
- CV extraction
- Recruitment analytics

### Data Extraction (Signal API)
- Extract post reactions and comments
- Extract profile data and posts
- Company content analysis
- Real-time data collection

## Usage Examples

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

### Network Management
```javascript
// Send connection request
{
  "resource": "network",
  "operation": "sendConnectionRequest",
  "connectionRequestParams": {
    "profile_url": "https://linkedin.com/in/johndoe",
    "message": "Hello! I'd like to connect with you."
  }
}
```

### Content Creation
```javascript
// Create a LinkedIn post
{
  "resource": "post",
  "operation": "createPost",
  "createPostParams": {
    "content": "Excited to share our latest product update!",
    "visibility": "public"
  }
}
```

## API Coverage

This node provides 100% coverage of the Linkup API including:

- **LinkedIn Engagement API**: Full automation capabilities
- **Data API**: Complete data extraction features
- **Signal API**: Real-time data collection
- **Company API**: Business intelligence tools
- **Person API**: Profile management and search

## Support

- **Documentation**: [docs.linkupapi.com](https://docs.linkupapi.com)
- **API Reference**: [docs.linkupapi.com/api-reference](https://docs.linkupapi.com/api-reference)
- **Support**: [app.linkupapi.com/support](https://app.linkupapi.com/support)
- **Dashboard**: [app.linkupapi.com](https://app.linkupapi.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Version History

- **0.0.14**: Fixed credential authentication issues, improved compatibility
- **0.0.13**: Initial release with full API coverage