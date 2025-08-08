import { INodeProperties } from "n8n-workflow";

export const personApiProperties: INodeProperties[] = [
  // PERSON API - Paramètres
  {
    displayName: "Search Profiles Parameters",
    name: "searchProfilesParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["personApi"],
        operation: ["searchProfiles"],
      },
    },
    options: [
      {
        displayName: "Person Keyword *",
        name: "personKeyword",
        type: "string",
        required: true,
        default: "",
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
    placeholder: "Add profile parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["personApi"],
        operation: ["extractProfileInfo"],
      },
    },
    options: [
      {
        displayName: "Profile URL *",
        name: "profileUrl",
        type: "string",
        required: true,
        default: "",
        placeholder: "https://www.linkedin.com/in/username",
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
        resource: ["personApi"],
        operation: ["profileEnrichment"],
      },
    },
    options: [
      {
        displayName: "Profile URL *",
        name: "profileUrl",
        type: "string",
        required: true,
        default: "",
        placeholder: "https://www.linkedin.com/in/username",
        description: "LinkedIn profile URL to enrich",
      },
      {
        displayName: "Enrichment Type",
        name: "enrichmentType",
        type: "options",
        options: [
          {
            name: "Full",
            value: "full",
          },
          {
            name: "Basic",
            value: "basic",
          },
        ],
        default: "full",
        description: "Type of enrichment to perform",
      },
    ],
  },
]; 