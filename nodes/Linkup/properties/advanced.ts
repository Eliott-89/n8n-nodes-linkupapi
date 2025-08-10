import { INodeProperties } from "n8n-workflow";

export const advancedProperties: INodeProperties[] = [
  {
    displayName: "Advanced Options",
    name: "advancedOptions",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    options: [
      {
        displayName: "Timeout",
        name: "timeout",
        type: "number",
        default: 30000,
        description: "Timeout in milliseconds for API requests",
        typeOptions: {
          minValue: 1000,
          maxValue: 300000,
        },
      },
      {
        displayName: "Retry Attempts",
        name: "retryAttempts",
        type: "number",
        default: 3,
        description: "Number of retry attempts for failed requests",
        typeOptions: {
          minValue: 0,
          maxValue: 10,
        },
      },
      {
        displayName: "Debug Mode",
        name: "debugMode",
        type: "boolean",
        default: false,
        description: "Enable debug mode for detailed logging",
      },
    ],
  },
];
