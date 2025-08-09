import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";
import { LinkupUtils } from "../utils";

export class MultiRequestsOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "customRequest":
        const method = context.getNodeParameter("method", itemIndex) as string;
        const url = context.getNodeParameter("url", itemIndex) as string;
        const sendQueryParams = context.getNodeParameter("sendQueryParams", itemIndex, false) as boolean;
        const sendHeaders = context.getNodeParameter("sendHeaders", itemIndex, false) as boolean;
        const sendBody = context.getNodeParameter("sendBody", itemIndex, false) as boolean;
        const bodyParams = context.getNodeParameter("bodyParams", itemIndex, {}) as any;
        const options = context.getNodeParameter("options", itemIndex, {}) as any;
        
        // Required parameters validation
        if (!url) {
          throw new Error("URL is required for this operation");
        }
        
        // Add base parameters
        body.method = method;
        body.url = url;
        
        // Ajouter automatiquement les credentials Linkup API
        const creds = await LinkupUtils.getCredentialsWithFallback(context);
        if (creds.apiKey) {
          body.apiKey = creds.apiKey;
        }
        if (creds.loginToken) {
          body.login_token = creds.loginToken;
        }
        
        // Add default headers
        body.headers = {
          "x-api-key": creds.apiKey,
          "Content-Type": "application/json",
        };
        
        // Add query parameters if enabled
        if (sendQueryParams) {
          const queryParams = context.getNodeParameter("queryParams", itemIndex, {}) as any;
          if (queryParams.parameters) {
            body.queryParams = {};
            for (const param of queryParams.parameters) {
              if (param.name && param.value) {
                body.queryParams[param.name] = param.value;
              }
            }
          }
        }
        
        // Add headers if enabled
        if (sendHeaders) {
          const headers = context.getNodeParameter("headers", itemIndex, {}) as any;
          if (headers.headers) {
            body.headers = {};
            for (const header of headers.headers) {
              if (header.name && header.value) {
                body.headers[header.name] = header.value;
              }
            }
          }
        }
        
        // Add request body if enabled
        if (sendBody && bodyParams && bodyParams.parameters && bodyParams.parameters.length > 0) {
          // Use Body Parameters if enabled and defined
          body.requestBody = {};
          for (const param of bodyParams.parameters) {
            if (param.name && param.value) {
              body.requestBody[param.name] = param.value;
            }
          }
        } else if (sendBody) {
          // If Send Body is enabled but no parameters, empty body
          body.requestBody = {};
        }
        
        // Ajouter les options
        if (options.timeout) body.timeout = options.timeout;
        if (options.followRedirects !== undefined) body.followRedirects = options.followRedirects;
        if (options.allowSelfSignedCertificates !== undefined) body.allowSelfSignedCertificates = options.allowSelfSignedCertificates;
        break;
    }

    return body;
  }
}
