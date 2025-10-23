import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeApiError,
} from "n8n-workflow";

// NODE_VERSION supprimé car plus utilisé
import { LinkupUtils } from "./utils";
import { nodeProperties } from "./properties";
import { AuthenticationOperations } from "./categories/authentication";
import { ProfileOperations } from "./categories/profile";
import { CompanyOperations } from "./categories/company";
import { NetworkOperations } from "./categories/network";
import { MessageOperations } from "./categories/message";
import { PostOperations } from "./categories/post";
import { RecruiterOperations } from "./categories/recruiter";
import { CompanyApiOperations } from "./categories/companyApi";
import { PersonApiOperations } from "./categories/personApi";
import { MultiRequestsOperations } from "./categories/multiRequests";
import { MailApiOperations } from "./categories/mailApi";

export class Linkup implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Linkup API for LinkedIn",
    name: "linkup",
    icon: "file:linkup_api_optimized.svg",
    group: ["transform"],
    version: 1,
    description: "Connect your AI agent to LinkedIn and other B2B channels",
    defaults: {
      name: "LINKUP",
      color: "#011B24",
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
        const timeout = 60000; // Default timeout (60 secondes)

        // Get credentials
        const creds = await LinkupUtils.getCredentialsWithFallback(this);

        // Build the request body according to the category
        let body: any = {};

        // Build the body according to the category
        switch (resource) {
          case "authentication":
            body = await AuthenticationOperations.buildRequestBody(
              this,
              i,
              operation
            );
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
            body = await RecruiterOperations.buildRequestBody(
              this,
              i,
              operation
            );
            break;
          case "company api":
            body = await CompanyApiOperations.buildRequestBody(
              this,
              i,
              operation
            );
            break;
          case "person api":
            body = await PersonApiOperations.buildRequestBody(
              this,
              i,
              operation
            );
            break;
          case "multi requests":
            body = await MultiRequestsOperations.buildRequestBody(
              this,
              i,
              operation
            );
            break;
          case "mail api":
            body = await MailApiOperations.buildRequestBody(this, i, operation);
            break;
        }

        // Add default country if not specified
        if (!body.country) {
          body.country = "FR";
        }

        // Add login token if necessary (APRÈS la construction du body)
        if (
          creds.loginToken &&
          ![
            "login",
            "verify code",
            "search companies",
            "get company info",
            "get company info by domain",
            "search profiles",
            "extract profile info",

            "profile enrichment",
          ].includes(operation)
        ) {
          body.login_token = creds.loginToken;
        }

        // Pour Multi-Requests, ajouter les credentials au body si nécessaire
        if (resource === "multi requests" && operation === "custom request") {
          if (creds.country && !body.requestBody.country) {
            body.requestBody.country = creds.country;
          }
          if (creds.loginToken && !body.requestBody.login_token) {
            body.requestBody.login_token = creds.loginToken;
          }
        }

        // Get endpoint
        let endpoint = LinkupUtils.getEndpointForOperation(operation);

        // Pour Multi-Requests, utiliser directement l'URL fournie
        if (resource === "multi requests" && operation === "custom request") {
          const queryString = body.queryParams
            ? "?" +
              Object.entries(body.queryParams)
                .map(
                  ([key, value]) =>
                    `${key}=${encodeURIComponent(String(value))}`
                )
                .join("&")
            : "";

          // Construire les headers de base
          const baseHeaders: any = {};

          // Ajouter Content-Type seulement pour les méthodes qui envoient un body
          const method = body.method || "POST";
          if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
            baseHeaders["Content-Type"] = "application/json";
          }

          // Fusionner avec les headers personnalisés
          const finalHeaders = { ...baseHeaders };
          if (body.headers) {
            Object.keys(body.headers).forEach((key) => {
              finalHeaders[key] = body.headers[key];
            });
          }

          requestOptions = {
            method: method,
            url: body.url + queryString,
            headers: finalHeaders,
            timeout: body.timeout || timeout,
          };

          // Ajouter le body seulement pour les méthodes qui le supportent
          if (
            ["POST", "PUT", "PATCH"].includes(method.toUpperCase()) &&
            body.requestBody
          ) {
            requestOptions.body = body.requestBody;
          }
        } else {
          // Pour les autres ressources, utiliser l'endpoint normal
          requestOptions = LinkupUtils.buildRequestOptions(
            endpoint,
            "POST",
            body,
            timeout
          );
        }

        const response = await this.helpers.httpRequestWithAuthentication.call(
          this,
          "linkupApi",
          requestOptions
        );
        returnData.push({
          json: response || {},
          pairedItem: { item: i },
        });
      } catch (error: any) {
        if (this.continueOnFail()) {
          // Si continueOnFail est activé, ajouter l'erreur aux résultats
          let payload =
            error?.response?.data !== undefined
              ? error.response.data
              : error?.response?.body !== undefined
              ? error.response.body
              : {};

          // Normaliser {status:'error', data:'...'} -> {status:'error', message:'...'}
          if (
            payload &&
            typeof payload === "object" &&
            (payload as any).status === "error" &&
            (payload as any).message === undefined &&
            typeof (payload as any).data === "string"
          ) {
            payload = { status: "error", message: (payload as any).data } as any;
          }

          returnData.push({
            json: payload || { error: error.message },
            pairedItem: { item: i },
          });
          continue;
        }

        // Utiliser NodeApiError pour les erreurs d'API
        throw new NodeApiError(this.getNode(), error);
      }
    }

    return [returnData];
  }
}
