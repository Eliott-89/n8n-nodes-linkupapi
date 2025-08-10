import { INodeProperties } from "n8n-workflow";

export const multiRequestsProperties: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["multiRequests"],
      },
    },
    options: [
      {
        name: "Custom Request",
        value: "customRequest",
        description: "Make a custom HTTP request",
      },
    ],
    default: "customRequest",
  },
  {
    displayName: "URL",
    name: "url",
    type: "string",
    default: "",
    required: true,
    placeholder: "https://api.linkupapi.com/v1/profile/me",
    description: "The URL to make the request to",
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
      },
    },
  },
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
        name: "DELETE",
        value: "DELETE",
      },
      {
        name: "PATCH",
        value: "PATCH",
      },
    ],
    default: "POST",
    required: true,
    description: "The HTTP method to use",
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
      },
    },
  },
  {
    displayName: "Headers",
    name: "headers",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add Header",
    options: [
      {
        name: "headerParameters",
        displayName: "Headers",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            description: "Name of the header",
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Value of the header",
          },
        ],
      },
    ],
    description: "The headers to send with the request",
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
      },
    },
  },
  {
    displayName: "Body Content Type",
    name: "bodyContentType",
    type: "options",
    options: [
      {
        name: "JSON",
        value: "json",
      },
    ],
    default: "json",
    description: "The content type of the body",
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
        method: ["POST", "PUT", "PATCH"],
      },
    },
  },
  {
    displayName: "Specify Body",
    name: "specifyBody",
    type: "options",
    options: [
      {
        name: "Using Fields Below",
        value: "fields",
      },
    ],
    default: "fields",
    description: "How to specify the body",
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
        method: ["POST", "PUT", "PATCH"],
      },
    },
  },
  {
    displayName: "Body Parameters",
    name: "bodyParameters",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    placeholder: "Add Body Parameter",
    options: [
      {
        name: "parameter",
        displayName: "Parameters",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            description: "Name of the parameter",
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: "",
            description: "Value of the parameter",
          },
        ],
      },
    ],
    description: "The body parameters to send with the request",
    displayOptions: {
      show: {
        resource: ["multiRequests"],
        operation: ["customRequest"],
        method: ["POST", "PUT", "PATCH"],
      },
    },
  },
];
