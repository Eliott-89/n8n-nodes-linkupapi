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
    displayName: "Search Companies Parameters",
    name: "searchCompaniesParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["company"],
        operation: ["search companies"],
      },
    },
    options: [
      {
        displayName: "Keyword",
        name: "keyword",
        type: "string",
        default: "",
        placeholder: "e.g. automation",
        description: "Company name or keyword to search",
      },
      {
        displayName: "Location",
        name: "location",
        type: "string",
        default: "",
        placeholder: "e.g. sanFrancisco",
        description: "Location to search in",
      },
      {
        displayName: "Sector",
        name: "sector",
        type: "string",
        default: "",
        placeholder: "e.g. technology",
        description: "Company sector to filter by",
      },
      {
        displayName: "Company Size",
        name: "company_size",
        type: "string",
        default: "",
        placeholder: "e.g. 1000-5000",
        description: "Company size range",
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
