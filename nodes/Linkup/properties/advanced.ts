import { INodeProperties } from "n8n-workflow";

export const advancedProperties: INodeProperties[] = [
  // === ADVANCED OPTIONS ===
  {
    displayName: "Advanced Options",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add an option",
    default: {},
    options: [
      {
        displayName: "Timeout",
        name: "timeout",
        type: "number",
        default: 30000,
        description: "Request timeout in milliseconds",
      },
      {
        displayName: "Retry Count",
        name: "retryCount",
        type: "number",
        default: 3,
        description: "Number of retries on failure",
      },
    ],
  },
]; 