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

      // Déclarer requestOptions en dehors du try-catch pour l'accessibilité
      let requestOptions: any = {};
      
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

        // Pour Multi-Requests, utiliser directement l'URL fournie
        if (resource === "multiRequests" && operation === "customRequest") {
          const queryString = body.queryParams 
            ? '?' + Object.entries(body.queryParams).map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`).join('&')
            : '';
          
          // Construire les headers de base
          const baseHeaders: any = {
            "x-api-key": creds.apiKey,
            "User-Agent": "n8n-linkup-node/2.4.25",
          };
          
          // Ajouter Content-Type seulement pour les méthodes qui envoient un body
          const method = body.method || 'POST';
          if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
            baseHeaders["Content-Type"] = "application/json";
          }
          
          // Fusionner avec les headers personnalisés (ne pas écraser x-api-key)
          const finalHeaders = { ...baseHeaders };
          if (body.headers) {
            Object.keys(body.headers).forEach(key => {
              if (key.toLowerCase() !== 'x-api-key') {
                finalHeaders[key] = body.headers[key];
              }
            });
          }
          
          requestOptions = {
            method: method,
            url: body.url + queryString,
            headers: finalHeaders,
            timeout: body.timeout || timeout,
          };
          
          // Ajouter le body seulement pour les méthodes qui le supportent
          if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && body.requestBody) {
            requestOptions.body = body.requestBody;
          }
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

        console.log("🔄 LINKUP Request:", {
          url: requestOptions.url,
          method: requestOptions.method,
          hasApiKey: !!requestOptions.headers["x-api-key"],
          apiKeyLength: requestOptions.headers["x-api-key"]?.length || 0
        });

        const response = await this.helpers.httpRequest(requestOptions);

        console.log("✅ LINKUP Response received:", {
          status: response.status || "success",
          hasData: !!response
        });

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
        console.error("🚨 LINKUP Request failed:", {
          error: error.message,
          statusCode: error.statusCode,
          response: error.response?.body || error.response,
          resource,
          operation,
          url: requestOptions?.url
        });

        // Améliorer les messages d'erreur selon le code de statut
        let friendlyMessage = error.message || "Unknown error";
        if (error.statusCode === 401) {
          friendlyMessage = "❌ Authentication failed. Please check your LINKUP API key and credentials.";
        } else if (error.statusCode === 403) {
          friendlyMessage = "❌ Access forbidden. Your API key may not have sufficient permissions or credits.";
        } else if (error.statusCode === 404) {
          friendlyMessage = "❌ API endpoint not found. This operation may not be supported.";
        } else if (error.statusCode === 400) {
          friendlyMessage = "❌ Bad request. Please check your input parameters.";
        }

        returnData.push({
          json: {
            error: friendlyMessage,
            originalError: error.message,
            statusCode: error.statusCode,
            response: error.response?.body,
            resource,
            operation,
            timestamp: new Date().toISOString(),
            _debug: {
              requestUrl: requestOptions?.url,
              requestMethod: requestOptions?.method,
              hasApiKey: !!requestOptions?.headers?.["x-api-key"]
            }
          },
          pairedItem: { item: i },
        });
      }
    }

    return [returnData];
  }
}
