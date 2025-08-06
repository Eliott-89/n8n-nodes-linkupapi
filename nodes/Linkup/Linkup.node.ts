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
    inputs: ["main" as any],
    outputs: ["main" as any],
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

        // Construire le body de la requête selon la catégorie
        let body: any = {};

        // Ajouter le login token si nécessaire
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
          ].includes(operation)
        ) {
          body.login_token = creds.loginToken;
        }

        // Construire le body selon la catégorie
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
        }

        // Ajouter le pays par défaut si pas spécifié
        if (!body.country) {
          body.country = "FR";
        }

        // Get endpoint
        const endpoint = LinkupUtils.getEndpointForOperation(operation);

        // Construire les options de requête
        const requestOptions = LinkupUtils.buildRequestOptions(
          endpoint,
          "POST",
          creds.apiKey,
          body,
          timeout
        );

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
