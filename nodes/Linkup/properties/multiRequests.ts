import { INodeProperties } from "n8n-workflow";

export const multiRequestsProperties: INodeProperties[] = [
  // MULTI-REQUESTS - Parameters
  {
    displayName: "Method",
    name: "method",
    type: "options",
    options: [
      {
        name: "GET",
        value: "GET",
      },
      {
        name: "POST",
        value: "POST",
      },
      {
        name: "PUT",
        value: "PUT",
      },
      {
        name: "PATCH",
        value: "PATCH",
      },
      {
        name: "DELETE",
        value: "DELETE",
      },
    ],
    default: "POST",
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
      },
    },
    description: "HTTP method to use",
  },
  {
    displayName: "URL",
    name: "url",
    type: "string",
    default: "",
    placeholder: "https://api.linkupapi.com/v1/auth/login",
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
      },
    },
    description: "Full URL including base URL and endpoint",
  },
  {
    displayName: "Send Query Parameters",
    name: "sendQueryParams",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
      },
    },
    description: "Send query parameters with the request",
  },
  {
    displayName: "Query Parameters",
    name: "queryParams",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
        sendQueryParams: [true],
      },
    },
    options: [
      {
        displayName: "Parameters",
        name: "parameters",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            description: "Parameter name",
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Parameter value",
          },
        ],
      },
    ],
  },
  {
    displayName: "Send Body",
    name: "sendBody",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
      },
    },
    description: "Send body with the request",
  },
  {
    displayName: "Body Parameters",
    name: "bodyParams",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
        sendBody: [true],
      },
    },
    options: [
      {
        displayName: "Parameters",
        name: "parameters",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            description: "Parameter name",
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Parameter value",
          },
        ],
      },
    ],
  },
  {
    displayName: "Send Headers",
    name: "sendHeaders",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
      },
    },
    description: "Send custom headers with the request",
  },
  {
    displayName: "Headers",
    name: "headers",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
        sendHeaders: [true],
      },
    },
    options: [
      {
        displayName: "Headers",
        name: "headers",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            description: "Header name",
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Header value",
          },
        ],
      },
    ],
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
      },
    },
    options: [
      {
        displayName: "Timeout",
        name: "timeout",
        type: "number",
        default: 30000,
        description: "Request timeout in milliseconds",
      },
      {
        displayName: "Follow Redirects",
        name: "followRedirects",
        type: "boolean",
        default: true,
        description: "Follow HTTP redirects",
      },
      {
        displayName: "Allow Self Signed Certificates",
        name: "allowSelfSignedCertificates",
        type: "boolean",
        default: false,
        description: "Allow self-signed certificates",
      },
    ],
  },
];
