import { INodeProperties } from "n8n-workflow";

export const personApiProperties: INodeProperties[] = [
  // Person operations
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["personApi"],
      },
    },
    options: [
      {
        name: "Search",
        value: "searchProfilesApi",
        description: "Search profiles using Person API",
      },
      {
        name: "Extract Information",
        value: "extractProfileInfoApi",
        description: "Extract detailed profile information",
      },
      {
        name: "Enrichment",
        value: "profileEnrichment",
        description: "Enrich profile with additional data",
      },
    ],
    default: "searchProfilesApi",
  },

  // PERSON - Paramètres
  {
    displayName: "Search Profiles Parameters",
    name: "searchProfilesParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["personApi"],
        operation: ["searchProfilesApi"],
      },
    },
    options: [
      {
        displayName: "Person Keyword *",
        name: "personKeyword",
        type: "string",
        default: "",
        required: true,
        placeholder: "John Doe",
        description: "Search keyword for profiles",
      },
      {
        displayName: "Job Title",
        name: "job_title",
        type: "string",
        default: "",
        placeholder: "Software Engineer",
        description: "Job title to filter by",
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
        displayName: "School",
        name: "school",
        type: "string",
        default: "",
        placeholder: "Stanford University",
        description: "School to filter by",
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
        displayName: "Current Company",
        name: "current_company",
        type: "string",
        default: "",
        placeholder: "Microsoft",
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
    placeholder: "Add extract parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["personApi"],
        operation: ["extractProfileInfoApi"],
      },
    },
    options: [
      {
        displayName: "Profile URL",
        name: "profileUrl",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/in/username",
        description: "LinkedIn profile URL to extract information",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
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
        resource: ["personApi"],
        operation: ["profileEnrichment"],
      },
    },
    options: [
      {
        displayName: "First Name *",
        name: "first_name",
        type: "string",
        default: "",
        required: true,
        placeholder: "John",
        description: "First name for profile enrichment",
      },
      {
        displayName: "Last Name *",
        name: "last_name",
        type: "string",
        default: "",
        required: true,
        placeholder: "Doe",
        description: "Last name for profile enrichment",
      },
      {
        displayName: "Company Name *",
        name: "company_name",
        type: "string",
        default: "",
        required: true,
        placeholder: "Microsoft",
        description: "Company name for profile enrichment",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
    ],
  },
]; 