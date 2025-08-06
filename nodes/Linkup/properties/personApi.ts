import { INodeProperties } from "n8n-workflow";

export const personApiProperties: INodeProperties[] = [
  // Person API operations
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
        name: "Search profiles",
        value: "searchProfilesApi",
        description: "Search profiles using Person API",
      },
      {
        name: "Extract profile information",
        value: "extractProfileInfoApi",
        description: "Extract detailed profile information",
      },
      {
        name: "Profile enrichment",
        value: "profileEnrichment",
        description: "Enrich profile with additional data",
      },
    ],
    default: "searchProfilesApi",
  },

  // PERSON API - Paramètres
  {
    displayName: "Person Keyword *",
    name: "personKeyword",
    type: "string",
    default: "",
    required: true,
    placeholder: "John Doe",
    displayOptions: {
      show: {
        resource: ["personApi"],
        operation: ["searchProfilesApi"],
      },
    },
    description: "Search keyword for profiles",
  },
  {
    displayName: "Profile URL",
    name: "profileUrl",
    type: "string",
    default: "",
    placeholder: "https://www.linkedin.com/in/username",
    displayOptions: {
      show: {
        resource: ["personApi"],
        operation: ["extractProfileInfoApi"],
      },
    },
    description: "LinkedIn profile URL to extract information",
  },
  {
    displayName: "First Name *",
    name: "first_name",
    type: "string",
    default: "",
    required: true,
    placeholder: "John",
    displayOptions: {
      show: {
        resource: ["personApi"],
        operation: ["profileEnrichment"],
      },
    },
    description: "First name for profile enrichment",
  },
  {
    displayName: "Last Name *",
    name: "last_name",
    type: "string",
    default: "",
    required: true,
    placeholder: "Doe",
    displayOptions: {
      show: {
        resource: ["personApi"],
        operation: ["profileEnrichment"],
      },
    },
    description: "Last name for profile enrichment",
  },
  {
    displayName: "Company Name *",
    name: "company_name",
    type: "string",
    default: "",
    required: true,
    placeholder: "Microsoft",
    displayOptions: {
      show: {
        resource: ["personApi"],
        operation: ["profileEnrichment"],
      },
    },
    description: "Company name for profile enrichment",
  },
  {
    displayName: "Person API Search Parameters",
    name: "personApiSearchParams",
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
    displayName: "Person API Extract Info Parameters",
    name: "personApiExtractInfoParams",
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
    displayName: "Person API Profile Enrichment Parameters",
    name: "personApiProfileEnrichmentParams",
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