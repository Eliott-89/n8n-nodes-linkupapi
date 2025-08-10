import { IExecuteFunctions } from "n8n-workflow";

export class MultiRequestsOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<any> {
    const body: any = {};

    switch (operation) {
      case "customRequest":
        // Get URL parameter
        const url = context.getNodeParameter("url", itemIndex) as string;
        body.url = url;
        
        console.log("🔧 MULTI-REQUEST URL Debug:", {
          url: url,
          urlType: typeof url,
          urlLength: url ? url.length : 0,
        });

        // Get method parameter
        const method = context.getNodeParameter("method", itemIndex, "POST") as string;
        body.method = method;

        // Get timeout parameter
        body.timeout = 60000; // Default timeout

        // Get headers parameter
        const headersParam = context.getNodeParameter("headers", itemIndex, {}) as any;
        if (headersParam.headerParameters) {
          body.headers = {};
          headersParam.headerParameters.forEach((header: any) => {
            if (header.name && header.value) {
              body.headers[header.name] = header.value;
            }
          });
        }

        // Get body parameters
        const bodyParametersParam = context.getNodeParameter("bodyParameters", itemIndex, {}) as any;
        if (bodyParametersParam.parameter && bodyParametersParam.parameter.length > 0) {
          body.requestBody = {};
          bodyParametersParam.parameter.forEach((param: any) => {
            if (param.name && param.value !== undefined) {
              body.requestBody[param.name] = param.value;
            }
          });
        } else {
          // If no parameters are provided, use an empty body
          body.requestBody = {};
        }
        break;

      default:
        throw new Error(`Unknown operation: ${operation}`);
    }

    return body;
  }
}
