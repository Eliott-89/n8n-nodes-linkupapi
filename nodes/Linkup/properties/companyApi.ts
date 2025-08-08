import { INodeProperties } from "n8n-workflow";

export const companyApiProperties: INodeProperties[] = [
  // COMPANY API - Paramètres
  {
    displayName: "Search Companies Parameters",
    name: "searchCompaniesParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["companyApi"],
        operation: ["searchCompanies"],
      },
    },
    options: [
      {
        displayName: "Company Keyword *",
        name: "companyKeyword",
        type: "string",
        required: true,
        default: "",
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
        operation: ["getCompanyInfo"],
      },
    },
    options: [
      {
        displayName: "Company URL *",
        name: "companyUrl",
        type: "string",
        required: true,
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
        displayName: "Domain *",
        name: "domain",
        type: "string",
        required: true,
        default: "",
        placeholder: "microsoft.com",
        description: "Company domain name",
      },
    ],
  },
]; 