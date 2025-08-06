import { INodeProperties } from "n8n-workflow";

export const profileProperties: INodeProperties[] = [
  // Profile operations
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["profile"],
      },
    },
    options: [
      {
        name: "Get My Profile",
        value: "getMyProfile",
        description: "Get your LinkedIn profile information",
      },
      {
        name: "Extract Profile Information",
        value: "extractProfileInfo",
        description: "Extract information from a public LinkedIn profile",
      },
      {
        name: "Search Profile",
        value: "searchProfile",
        description: "Search LinkedIn profiles",
      },
    ],
    default: "getMyProfile",
  },

  // PROFILE - Paramètres Linkup
  {
    displayName: "LinkedIn Profile URL *",
    name: "profileUrl",
    type: "string",
    default: "",
    required: true,
    placeholder: "https://www.linkedin.com/in/username",
    displayOptions: {
      show: {
        resource: ["profile"],
        operation: ["extractProfileInfo"],
      },
    },
    description: "LinkedIn profile URL",
  },
  {
    displayName: "Country Code",
    name: "country",
    type: "string",
    default: "FR",
    placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
    displayOptions: {
      show: {
        resource: ["profile"],
        operation: ["extractProfileInfo"],
      },
    },
    description:
      "Country code for proxy selection (e.g., FR for France, US for United States)",
  },
  {
    displayName: "Search Profile Parameters",
    name: "searchProfileParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["profile"],
        operation: ["searchProfile"],
      },
    },
    options: [
      {
        displayName: "Keyword",
        name: "keyword",
        type: "string",
        default: "",
        placeholder: "software engineer",
        description: "Search keyword",
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
        displayName: "Company URL",
        name: "company_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/company/microsoft",
        description: "Company URL to filter by",
      },
      {
        displayName: "School URL",
        name: "school_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/school/stanford-university",
        description: "School URL to filter by",
      },
      {
        displayName: "Network",
        name: "network",
        type: "string",
        default: "",
        placeholder: "1st, 2nd, 3rd",
        description: "Network degree to search in",
      },
      {
        displayName: "First Name",
        name: "first_name",
        type: "string",
        default: "",
        placeholder: "John",
        description: "First name to search for",
      },
      {
        displayName: "Last Name",
        name: "last_name",
        type: "string",
        default: "",
        placeholder: "Doe",
        description: "Last name to search for",
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
        placeholder: "Software Engineer",
        description: "Job title to search for",
      },
      {
        displayName: "Fetch Invitation State",
        name: "fetch_invitation_state",
        type: "boolean",
        default: false,
        description: "Whether to fetch invitation state",
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
    displayName: "Get My Profile Parameters",
    name: "getMyProfileParams",
    type: "collection",
    placeholder: "Add profile parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["profile"],
        operation: ["getMyProfile"],
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