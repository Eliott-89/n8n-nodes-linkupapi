import { INodeProperties } from "n8n-workflow";

export const companyProperties: INodeProperties[] = [
  // COMPANY - Parameters
  {
    displayName: "Get Company Parameters",
    name: "getCompanyParams",
    type: "collection",
    placeholder: "Add company parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["getCompanyInfo"],
      },
    },
    options: [
      {
        displayName: "Company URL *",
        name: "companyUrl",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/company/microsoft",
        description: "LinkedIn company URL",
      },
    ],
  },
  {
    displayName: "Search Companies Parameters",
    name: "searchCompaniesParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["searchCompanies"],
      },
    },
    options: [
      {
        displayName: "Keyword",
        name: "keyword",
        type: "string",
        default: "",
        placeholder: "Microsoft",
        description: "Company name or keyword to search",
      },
      {
        displayName: "Location",
        name: "location",
        type: "string",
        default: "",
        placeholder: "San Francisco",
        description: "Location to search in",
      },
      {
        displayName: "Sector",
        name: "sector",
        type: "string",
        default: "",
        placeholder: "Technology",
        description: "Company sector to filter by",
      },
      {
        displayName: "Company Size",
        name: "company_size",
        type: "string",
        default: "",
        placeholder: "1000-5000",
        description: "Company size range",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Start Page",
        name: "start_page",
        type: "number",
        default: 1,
        description: "Starting page number",
      },
      {
        displayName: "End Page",
        name: "end_page",
        type: "number",
        default: 1,
        description: "Ending page number",
      },
    ],
  },
];
