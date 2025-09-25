import { INodeProperties } from "n8n-workflow";

export const personApiProperties: INodeProperties[] = [
  // PERSON API - Parameters
  {
    displayName: "Search Profiles Parameters",
    name: "searchProfilesParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["person api"],
        operation: ["search profiles"],
      },
    },
    options: [
      {
        displayName: "Keyword",
        name: "keyword",
        type: "string",
        default: "",
        placeholder: "e.g. Nathan Smith",
        description: "Search keyword for profiles",
      },
      {
        displayName: "Job Title",
        name: "job_title",
        type: "string",
        default: "",
        placeholder: "e.g. softwareEngineer",
        description: "Job title to filter by",
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
        displayName: "School",
        name: "school",
        type: "string",
        default: "",
        placeholder: "e.g. stanfordUniversity",
        description: "School to filter by",
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
        displayName: "Current Company",
        name: "current_company",
        type: "string",
        default: "",
        placeholder: "e.g. automation",
        description: "Current company to filter by",
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
    displayName: "Extract Profile Info Parameters",
    name: "extractProfileInfoParams",
    type: "collection",
    placeholder: "Add profile parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["person api"],
        operation: ["extract profile info"],
      },
    },
    options: [
      {
        displayName: "Profile URL *",
        name: "profileUrl",
        type: "string",
        default: "",
        placeholder: "e.g. https://www.linkedin.com/in/nathanSmith",
        description: "LinkedIn profile URL",
      },
    ],
  },

  {
    displayName: "Profile Enrichment Parameters",
    name: "profileEnrichmentParams",
    type: "collection",
    placeholder: "Add enrichment parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["person api"],
        operation: ["profile enrichment"],
      },
    },
    options: [
      {
        displayName: "First Name *",
        name: "first_name",
        type: "string",
        default: "",
        placeholder: "e.g. Nathan",
        description: "First name of the person",
      },
      {
        displayName: "Last Name *",
        name: "last_name",
        type: "string",
        default: "",
        placeholder: "e.g. Smith",
        description: "Last name of the person",
      },
      {
        displayName: "Company Name *",
        name: "company_name",
        type: "string",
        default: "",
        placeholder: "e.g. automation",
        description: "Company name where the person works",
      },
    ],
  },
  {
    displayName: "Extract Company Employees Parameters",
    name: "extractCompanyEmployeesParams",
    type: "collection",
    placeholder: "Add employees extraction parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["person api"],
        operation: ["extract company employees"],
      },
    },
    options: [
      {
        displayName: "Company Name *",
        name: "company_name",
        type: "string",
        default: "",
        placeholder: "e.g. automation",
        description: "Name of the company to extract employees from",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of employees to return",
      },
      {
        displayName: "Decision Makers Only",
        name: "decision_makers_only",
        type: "boolean",
        default: false,
        description: "Whether to extract only decision makers",
      },
    ],
  },
];
