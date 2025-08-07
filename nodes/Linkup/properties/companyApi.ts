import { INodeProperties } from "n8n-workflow";

export const companyApiProperties: INodeProperties[] = [
  // Company operations
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["companyApi"],
      },
    },
    options: [
      {
        name: "Search",
        value: "searchCompaniesApi",
        description: "Search companies using Company API",
      },
      {
        name: "Get Information",
        value: "getCompanyInfoApi",
        description: "Get detailed company information",
      },
      {
        name: "Get by Domain",
        value: "getCompanyInfoByDomain",
        description: "Get company information using domain name",
      },
    ],
    default: "searchCompaniesApi",
  },

  // COMPANY - Paramètres
  {
    displayName: "Search Companies Parameters",
    name: "searchCompaniesParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["companyApi"],
        operation: ["searchCompaniesApi"],
      },
    },
    options: [
      {
        displayName: "Company Keyword *",
        name: "companyKeyword",
        type: "string",
        default: "",
        required: true,
        placeholder: "Microsoft",
        description: "Company name or keyword to search",
      },
      {
        displayName: "Industry",
        name: "industry",
        type: "string",
        default: "",
        placeholder: "Technology",
        description: "Industry to filter by",
      },
      {
        displayName: "Location",
        name: "location",
        type: "string",
        default: "",
        placeholder: "San Francisco",
        description: "Location to filter by",
      },
      {
        displayName: "Employee Range",
        name: "employee_range",
        type: "string",
        default: "",
        placeholder: "1000-5000",
        description: "Employee count range",
      },
      {
        displayName: "Founding Company",
        name: "founding_company",
        type: "boolean",
        default: false,
        description: "Whether to filter by founding companies",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
    ],
  },
  {
    displayName: "Get Company Info Parameters",
    name: "getCompanyInfoParams",
    type: "collection",
    placeholder: "Add company parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["companyApi"],
        operation: ["getCompanyInfoApi"],
      },
    },
    options: [
      {
        displayName: "Company URL",
        name: "company_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/company/microsoft",
        description: "LinkedIn company URL",
      },
    ],
  },
  {
    displayName: "Get Company Info By Domain Parameters",
    name: "getCompanyInfoByDomainParams",
    type: "collection",
    placeholder: "Add domain parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["companyApi"],
        operation: ["getCompanyInfoByDomain"],
      },
    },
    options: [
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "microsoft.com",
        description: "Company domain name",
      },
    ],
  },
]; 