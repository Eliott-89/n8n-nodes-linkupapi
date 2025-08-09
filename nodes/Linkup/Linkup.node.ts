import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

import { NODE_VERSION } from "./types";
import { LinkupUtils } from "./utils";
import { nodeProperties } from "./properties";
import { AuthenticationOperations } from "./categories/authentication";
import { ProfileOperations } from "./categories/profile";
import { CompanyOperations } from "./categories/company";
import { NetworkOperations } from "./categories/network";
import { MessageOperations } from "./categories/message";
import { PostOperations } from "./categories/post";
import { RecruiterOperations } from "./categories/recruiter";
import { SignalOperations } from "./categories/signal";
import { CompanyApiOperations } from "./categories/companyApi";
import { PersonApiOperations } from "./categories/personApi";
import { MultiRequestsOperations } from "./categories/multiRequests";

export class Linkup implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Linkup API for LinkedIn",
    name: "linkup",
    icon: "file:linkup.svg",
    group: ["transform"],
    version: 1,
    description: "Automate LinkedIn with Linkup",
    defaults: {
      name: "LINKUP",
      color: "#0077b5",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "linkupApi",
      },
    ],
    properties: nodeProperties,
  };

  // === MAIN EXECUTION METHOD ===
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter("resource", i) as string;
      const operation = this.getNodeParameter("operation", i) as string;

      try {
        const timeout = 30000; // Default timeout

        // Get credentials
        const creds = await LinkupUtils.getCredentialsWithFallback(this);

        // Build the request body according to the category
        let body: any = {};

        // Add login token if necessary
        if (
          creds.loginToken &&
          ![
            "login",
            "verifyCode",
            "extractPostReactions",
            "extractPostComments",
            "extractProfileReactions",
            "extractProfileComments",
            "extractProfilePosts",
            "extractCompanyPosts",
            "searchCompaniesApi",
            "getCompanyInfoApi",
            "getCompanyInfoByDomain",
            "searchProfilesApi",
            "extractProfileInfoApi",
            "profileEnrichment",
            "extractCompanyEmployees",
          ].includes(operation)
        ) {
          body.login_token = creds.loginToken;
        }

        // Build the body according to the category
        switch (resource) {
          case "authentication":
            body = await AuthenticationOperations.buildRequestBody(this, i, operation);
            break;
          case "profile":
            body = await ProfileOperations.buildRequestBody(this, i, operation);
            break;
          case "company":
            body = await CompanyOperations.buildRequestBody(this, i, operation);
            break;
          case "network":
            body = await NetworkOperations.buildRequestBody(this, i, operation);
            break;
          case "message":
            body = await MessageOperations.buildRequestBody(this, i, operation);
            break;
          case "post":
            body = await PostOperations.buildRequestBody(this, i, operation);
            break;
          case "recruiter":
            body = await RecruiterOperations.buildRequestBody(this, i, operation);
            break;
          case "signal":
            body = await SignalOperations.buildRequestBody(this, i, operation);
            break;
          case "companyApi":
            body = await CompanyApiOperations.buildRequestBody(this, i, operation);
            break;
          case "personApi":
            body = await PersonApiOperations.buildRequestBody(this, i, operation);
            break;
          case "multiRequests":
            body = await MultiRequestsOperations.buildRequestBody(this, i, operation);
            break;
        }

        // Add default country if not specified
        if (!body.country) {
          body.country = "FR";
        }

        // Get endpoint
        let endpoint = LinkupUtils.getEndpointForOperation(operation);
        let requestOptions: any;

        // Pour Multi-Requests, utiliser directement l'URL fournie
        if (resource === "multiRequests") {
          requestOptions = {
            method: body.method,
            url: body.url,
            headers: body.headers || {},
            body: body.requestBody || {},
            timeout: timeout,
          };
        } else {
          // Pour les autres ressources, utiliser l'endpoint normal
          requestOptions = LinkupUtils.buildRequestOptions(
            endpoint,
            "POST",
            creds.apiKey,
            body,
            timeout
          );
        }

        const response = await this.helpers.httpRequest(requestOptions);

        const result = {
          json: {
            _debug: {
              requestBody: body,
              requestHeaders: requestOptions.headers,
              endpoint: endpoint,
              apiResponse: response,
            },
            ...response,
            _meta: {
              resource,
              operation,
              timestamp: new Date().toISOString(),
              nodeVersion: NODE_VERSION,
            },
          },
          pairedItem: { item: i },
        };

        returnData.push(result);
      } catch (error: any) {
        returnData.push({
          json: {
            error: error.message || "Unknown error",
            resource,
            operation,
            timestamp: new Date().toISOString(),
          },
          pairedItem: { item: i },
        });
      }
    }

    return [returnData];
  }
}
