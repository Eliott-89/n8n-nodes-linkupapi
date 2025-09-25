import { INodeProperties } from "n8n-workflow";

export const mailApiProperties: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["mail api"],
      },
    },
    options: [
      {
        name: "Email Finder",
        value: "email finder",
        description: "Find email addresses from LinkedIn profiles",
      },
      {
        name: "Email Reverse",
        value: "email reverse",
        description: "Reverse lookup email to get LinkedIn profile information",
      },
      {
        name: "Email Validate",
        value: "email validate",
        description: "Validate if an email address is valid and deliverable",
      },
    ],
    default: "email finder",
  },

  // MAIL API - Parameters for emailFinder
  {
    displayName: "Email Finder Parameters",
    name: "emailFinderParams",
    type: "collection",
    placeholder: "Add email finder parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["mail api"],
        operation: ["email finder"],
      },
    },
    options: [
      {
        displayName: "LinkedIn URL",
        name: "linkedin_url",
        type: "string",
        default: "",
        placeholder: "e.g. https://www.linkedin.com/in/nathanSmith",
        description:
          "LinkedIn profile URL (e.g., https://www.linkedin.com/in/jeffbezos/)",
      },
      {
        displayName: "First Name",
        name: "first_name",
        type: "string",
        default: "",
        placeholder: "e.g. Nathan",
        description: "Person's first name",
      },
      {
        displayName: "Last Name",
        name: "last_name",
        type: "string",
        default: "",
        placeholder: "e.g. Smith",
        description: "Person's last name",
      },
      {
        displayName: "Company Domain",
        name: "company_domain",
        type: "string",
        default: "",
        placeholder: "e.g. amazon.com",
        description:
          'Company domain (e.g., "company.com") Recommended over company_name for better accuracy',
      },
      {
        displayName: "Company Name",
        name: "company_name",
        type: "string",
        default: "",
        placeholder: "e.g. automation",
        description:
          "Company name (will be used to find domain) Less accurate than providing company_domain directly",
      },
    ],
  },

  // MAIL API - Parameters for emailReverse
  {
    displayName: "Email Reverse Parameters",
    name: "emailReverseParams",
    type: "collection",
    placeholder: "Add email reverse parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["mail api"],
        operation: ["email reverse"],
      },
    },
    options: [
      {
        displayName: "Email Address *",
        name: "email",
        type: "string",
        default: "",
        placeholder: "e.g. nathan@example.com",
        description: "Email address to perform reverse lookup on",
      },
    ],
  },

  // MAIL API - Parameters for emailValidate
  {
    displayName: "Email Validate Parameters",
    name: "emailValidateParams",
    type: "collection",
    placeholder: "Add email validate parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["mail api"],
        operation: ["email validate"],
      },
    },
    options: [
      {
        displayName: "Email Address *",
        name: "email",
        type: "string",
        default: "",
        placeholder: "e.g. nathan@example.com",
        description: "Email address to validate (e.g., elon.musk@tesla.com)",
      },
    ],
  },
];
