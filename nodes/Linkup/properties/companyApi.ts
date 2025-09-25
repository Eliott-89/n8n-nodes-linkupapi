import { INodeProperties } from "n8n-workflow";

export const companyApiProperties: INodeProperties[] = [
  // COMPANY API - Parameters
  {
    displayName: "Search Companies Parameters",
    name: "searchCompaniesParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["company api"],
        operation: ["search companies"],
      },
    },
    options: [
      {
        displayName: "Company Keyword *",
        name: "companyKeyword",
        type: "string",
        default: "",
        placeholder: "e.g. automation",
        description: "Company name or keyword to search",
      },
      {
        displayName: "Industry",
        name: "industry",
        type: "string",
        default: "",
        placeholder: "e.g. technology",
        description: "Industry to filter by",
      },
      {
        displayName: "Location",
        name: "location",
        type: "string",
        default: "",
        placeholder: "e.g. sanFrancisco",
        description: "Location to filter by",
      },
      {
        displayName: "Employee Range",
        name: "employee_range",
        type: "string",
        default: "",
        placeholder: "e.g. 1000-5000",
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
        resource: ["company api"],
        operation: ["get company info"],
      },
    },
    options: [
      {
        displayName: "Company URL *",
        name: "companyUrl",
        type: "string",
        default: "",
        placeholder: "e.g. https://www.linkedin.com/company/microsoftCorp",
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
        resource: ["company api"],
        operation: ["get company info by domain"],
      },
    },
    options: [
      {
        displayName: "Domain *",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "e.g. microsoft.com",
        description: "Company domain name",
      },
    ],
  },
];
