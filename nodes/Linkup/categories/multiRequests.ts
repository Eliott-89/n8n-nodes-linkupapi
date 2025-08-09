import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

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
        
        // Validation de l'URL
        try {
          new URL(url);
        } catch (error) {
          throw new Error(`Invalid URL format: ${url}. Please provide a complete URL including protocol (https://)`);
        }
        
        // Add base parameters
        body.method = method;
        body.url = url;
        
        // Les credentials seront gérées dans le nœud principal
        // Initialiser les headers par défaut (seront fusionnés plus tard)
        body.headers = {};
        
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
            // Fusionner avec les headers par défaut au lieu de les écraser
            const customHeaders: any = {};
            for (const header of headers.headers) {
              if (header.name && header.value) {
                customHeaders[header.name] = header.value;
              }
            }
            body.headers = { ...body.headers, ...customHeaders };
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
