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

              // Declare requestOptions outside try-catch for accessibility
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
          case "signal":
            body = await SignalOperations.buildRequestBody(this, i, operation);
            break;
          case "companyApi":
            body = await CompanyApiOperations.buildRequestBody(
              this,
              i,
              operation
            );
            break;
          case "personApi":
            body = await PersonApiOperations.buildRequestBody(
              this,
              i,
              operation
            );
            break;
          case "multiRequests":
            body = await MultiRequestsOperations.buildRequestBody(
              this,
              i,
              operation
            );
            break;
        }

        // Add default country if not specified
        if (!body.country) {
          body.country = "FR";
        }

        // Add login token if necessary (AFTER building the body)
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

        // For Multi-Requests, add credentials to body if necessary
        if (resource === "multiRequests" && operation === "customRequest") {
          if (creds.country && !body.requestBody.country) {
            body.requestBody.country = creds.country;
          }
          if (creds.loginToken && !body.requestBody.login_token) {
            body.requestBody.login_token = creds.loginToken;
          }
        }

        // Get endpoint
        let endpoint = LinkupUtils.getEndpointForOperation(operation);

        // For Multi-Requests, use the provided URL directly
        if (resource === "multiRequests" && operation === "customRequest") {
          const queryString = body.queryParams
            ? "?" +
              Object.entries(body.queryParams)
                .map(
                  ([key, value]) =>
                    `${key}=${encodeURIComponent(String(value))}`
                )
                .join("&")
            : "";

          // Build base headers
          const baseHeaders: any = {
            "x-api-key": creds.apiKey,
          };

          // Add Content-Type only for methods that send a body
          const method = body.method || "POST";
          if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
            baseHeaders["Content-Type"] = "application/json";
          }

          // Merge with custom headers (don't overwrite x-api-key)
          const finalHeaders = { ...baseHeaders };
          if (body.headers) {
            Object.keys(body.headers).forEach((key) => {
              if (key.toLowerCase() !== "x-api-key") {
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

          console.log("🔧 MULTI-REQUEST Debug:", {
            originalUrl: body.url,
            finalUrl: requestOptions.url,
            method: method,
            hasBody: !!body.requestBody,
            bodyKeys: body.requestBody ? Object.keys(body.requestBody) : [],
            bodyContent: body.requestBody,
            headers: finalHeaders,
          });

          // Add body only for methods that support it
          if (
            ["POST", "PUT", "PATCH"].includes(method.toUpperCase()) &&
            body.requestBody
          ) {
            requestOptions.body = body.requestBody;
          }
        } else {
          // For other resources, use the normal endpoint
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
          apiKeyLength: requestOptions.headers["x-api-key"]?.length || 0,
          bodyKeys: Object.keys(body || {}),
          bodyPreview:
            resource === "authentication"
              ? "***"
              : JSON.stringify(body).substring(0, 200) + "...",
          fullBody:
            resource === "authentication" ? "***" : JSON.stringify(body),
          requestBody: JSON.stringify(requestOptions.body),
          headers: requestOptions.headers,
          bodyValues:
            resource === "authentication"
              ? {
                  emailLength: body.email?.length || 0,
                  passwordLength: body.password?.length || 0,
                  country: body.country,
                }
              : "***",
        });

        const response = await this.helpers.httpRequest(requestOptions);

        console.log("✅ LINKUP Response received:", {
          status: response?.status || "success",
          hasData: !!response,
          responseType: typeof response,
          isNull: response === null,
        });

        const result = {
          json: {
            ...(response || {}),
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
          responseText:
            typeof error.response?.body === "string"
              ? error.response.body
              : JSON.stringify(error.response?.body),
          resource,
          operation,
          url: requestOptions?.url,
        });

        // Detailed error handling based on status code and message
        let friendlyMessage = error.message || "Unknown error";
        const responseBody = error.response?.body;
        const responseText =
          typeof responseBody === "string"
            ? responseBody
            : JSON.stringify(responseBody || {});

        if (error.statusCode === 400) {
          if (
            responseText.includes("Invalid LinkedIn URL format") ||
            responseText.includes("Invalid post_url parameter")
          ) {
            friendlyMessage =
              "❌ Invalid LinkedIn URL format. Please verify that the URL is in the correct format (e.g., https://www.linkedin.com/in/username)";
          } else if (
            responseText.includes("Invalid LinkedIn company URL format")
          ) {
            friendlyMessage =
              "❌ Invalid LinkedIn company URL format. Please verify that the URL is in the correct format (e.g., https://www.linkedin.com/company/company-name)";
          } else if (responseText.includes("Required fields are missing")) {
            friendlyMessage =
              "❌ Required fields are missing. Please verify that all required parameters are provided.";
          } else if (
            responseText.includes("total_results must be greater than 0")
          ) {
            friendlyMessage =
              "❌ The total_results parameter must be greater than 0.";
          } else if (
            responseText.includes("Error while sending connection request")
          ) {
            friendlyMessage =
              "❌ Error while sending connection request. Please verify the parameters.";
          } else if (responseText.includes("Error while sending message")) {
            friendlyMessage =
              "❌ Error while sending message. Please verify the recipient, content, and media URL if provided.";
          } else if (
            responseText.includes("Invalid media link") ||
            responseText.includes("Media link error")
          ) {
            friendlyMessage =
              "❌ The media URL is not valid. Please ensure it's a direct URL to an accessible media file.";
          } else if (responseText.includes("Error while creating post")) {
            friendlyMessage =
              "❌ Error while creating post. Please verify the content and parameters.";
          } else if (responseText.includes("Error while posting comment")) {
            friendlyMessage =
              "❌ Error while posting comment. Please verify the content.";
          } else if (responseText.includes("Bad parameter")) {
            friendlyMessage =
              "❌ Incorrect parameter. Please verify that all required fields are provided and correct.";
          } else {
            friendlyMessage =
              "❌ Incorrect parameters. Please verify your input data.";
          }
        } else if (error.statusCode === 401) {
          if (
            responseText.includes("Invalid API key or insufficient credits")
          ) {
            friendlyMessage =
              "❌ Invalid API key or insufficient credits. Please verify your API key and LINKUP credits.";
          } else if (responseText.includes("Bad username or password")) {
            friendlyMessage =
              "❌ Incorrect username or password. Please verify your LinkedIn credentials.";
          } else if (responseText.includes("Session expired")) {
            friendlyMessage =
              "❌ Session expired. Please log back into your LinkedIn account.";
          } else if (responseText.includes("Verification failed")) {
            friendlyMessage =
              "❌ Verification failed. Please verify your verification code.";
          } else {
            friendlyMessage =
              "❌ Authentication failed. Please verify your LINKUP API key and credentials.";
          }
        } else if (error.statusCode === 403) {
          if (responseBody?.includes("LinkedIn token expired")) {
            friendlyMessage =
              "❌ LinkedIn token expired. Please log back into your LinkedIn account.";
          } else {
            friendlyMessage =
              "❌ Access forbidden. Your API key may not have sufficient permissions.";
          }
        } else if (error.statusCode === 404) {
          if (
            responseBody?.includes(
              "Error while getting contact info, check the linkedin profile url"
            )
          ) {
            friendlyMessage =
              "❌ Unable to retrieve contact information. Please verify the LinkedIn profile URL.";
          } else {
            friendlyMessage =
              "❌ API endpoint not found. This operation may not be supported.";
          }
        } else if (error.statusCode === 429) {
          if (responseBody?.includes("LinkedIn Rate limit exceeded")) {
            friendlyMessage =
              "⚠️ LinkedIn rate limit exceeded. Please try again later.";
          } else if (responseBody?.includes("API Rate limit exceeded")) {
            friendlyMessage =
              "⚠️ API rate limit exceeded. Please try again later.";
          } else {
            friendlyMessage =
              "⚠️ Too many requests. Please wait before trying again.";
          }
        } else if (error.statusCode === 500) {
          if (responseBody?.includes("LinkedIn API error occurred")) {
            friendlyMessage =
              "🔧 LinkedIn API error. The service may be temporarily unavailable.";
          } else if (
            responseBody?.includes(
              "An error occurred while processing your request"
            )
          ) {
            friendlyMessage =
              "🔧 Error while processing your request. Please try again.";
          } else {
            friendlyMessage =
              "🔧 Server error. Please try again later.";
          }
        }

        returnData.push({
          json: {
            error: friendlyMessage,
            originalError: error.message,
            statusCode: error.statusCode,
            response: error.response?.body,
            responseText: responseText,
            resource,
            operation,
            timestamp: new Date().toISOString(),
            _debug: {
              requestUrl: requestOptions?.url,
              requestMethod: requestOptions?.method,
              hasApiKey: !!requestOptions?.headers?.["x-api-key"],
              requestBody: JSON.stringify(requestOptions?.body || {}),
            },
          },
          pairedItem: { item: i },
        });
      }
    }

    return [returnData];
  }
}
