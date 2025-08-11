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

        // Add login token if necessary (APRÈS la construction du body)
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

        // Pour Multi-Requests, ajouter les credentials au body si nécessaire
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

        // Pour Multi-Requests, utiliser directement l'URL fournie
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

          // Construire les headers de base
          const baseHeaders: any = {
            "x-api-key": creds.apiKey,
          };

          // Ajouter Content-Type seulement pour les méthodes qui envoient un body
          const method = body.method || "POST";
          if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
            baseHeaders["Content-Type"] = "application/json";
          }

          // Fusionner avec les headers personnalisés (ne pas écraser x-api-key)
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

        // Gestion détaillée des erreurs selon le code de statut et le message
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
              "❌ Format d'URL LinkedIn invalide. Vérifiez que l'URL est au format correct (ex: https://www.linkedin.com/in/username)";
          } else if (
            responseText.includes("Invalid LinkedIn company URL format")
          ) {
            friendlyMessage =
              "❌ Format d'URL d'entreprise LinkedIn invalide. Vérifiez que l'URL est au format correct (ex: https://www.linkedin.com/company/company-name)";
          } else if (responseText.includes("Required fields are missing")) {
            friendlyMessage =
              "❌ Champs requis manquants. Vérifiez que tous les paramètres obligatoires sont fournis.";
          } else if (
            responseText.includes("total_results must be greater than 0")
          ) {
            friendlyMessage =
              "❌ Le paramètre total_results doit être supérieur à 0.";
          } else if (
            responseText.includes("Error while sending connection request")
          ) {
            friendlyMessage =
              "❌ Erreur lors de l'envoi de la demande de connexion. Vérifiez les paramètres.";
          } else if (responseText.includes("Error while sending message")) {
            friendlyMessage =
              "❌ Erreur lors de l'envoi du message. Vérifiez le destinataire, le contenu et l'URL du média si fournie.";
          } else if (
            responseText.includes("Invalid media link") ||
            responseText.includes("Media link error")
          ) {
            friendlyMessage =
              "❌ L'URL du média n'est pas valide. Assurez-vous qu'il s'agit d'une URL directe vers un fichier média accessible.";
          } else if (responseText.includes("Error while creating post")) {
            friendlyMessage =
              "❌ Erreur lors de la création du post. Vérifiez le contenu et les paramètres.";
          } else if (responseText.includes("Error while posting comment")) {
            friendlyMessage =
              "❌ Erreur lors de la publication du commentaire. Vérifiez le contenu.";
          } else if (responseText.includes("Bad parameter")) {
            friendlyMessage =
              "❌ Paramètre incorrect. Vérifiez que tous les champs requis sont fournis et corrects.";
          } else {
            friendlyMessage =
              "❌ Paramètres incorrects. Vérifiez vos données d'entrée.";
          }
        } else if (error.statusCode === 401) {
          if (
            responseText.includes("Invalid API key or insufficient credits")
          ) {
            friendlyMessage =
              "❌ Clé API invalide ou crédits insuffisants. Vérifiez votre clé API et vos crédits LINKUP.";
          } else if (responseText.includes("Bad username or password")) {
            friendlyMessage =
              "❌ Nom d'utilisateur ou mot de passe incorrect. Vérifiez vos identifiants LinkedIn.";
          } else if (responseText.includes("Session expired")) {
            friendlyMessage =
              "❌ Session expirée. Reconnectez-vous à votre compte LinkedIn.";
          } else if (responseText.includes("Verification failed")) {
            friendlyMessage =
              "❌ Échec de la vérification. Vérifiez votre code de vérification.";
          } else {
            friendlyMessage =
              "❌ Échec d'authentification. Vérifiez votre clé API LINKUP et vos identifiants.";
          }
        } else if (error.statusCode === 403) {
          if (responseBody?.includes("LinkedIn token expired")) {
            friendlyMessage =
              "❌ Token LinkedIn expiré. Reconnectez-vous à votre compte LinkedIn.";
          } else {
            friendlyMessage =
              "❌ Accès interdit. Votre clé API peut ne pas avoir les permissions suffisantes.";
          }
        } else if (error.statusCode === 404) {
          if (
            responseBody?.includes(
              "Error while getting contact info, check the linkedin profile url"
            )
          ) {
            friendlyMessage =
              "❌ Impossible de récupérer les informations de contact. Vérifiez l'URL du profil LinkedIn.";
          } else {
            friendlyMessage =
              "❌ Endpoint API non trouvé. Cette opération peut ne pas être supportée.";
          }
        } else if (error.statusCode === 429) {
          if (responseBody?.includes("LinkedIn Rate limit exceeded")) {
            friendlyMessage =
              "⚠️ Limite de taux LinkedIn dépassée. Veuillez réessayer plus tard.";
          } else if (responseBody?.includes("API Rate limit exceeded")) {
            friendlyMessage =
              "⚠️ Limite de taux API dépassée. Veuillez réessayer plus tard.";
          } else {
            friendlyMessage =
              "⚠️ Trop de requêtes. Veuillez attendre avant de réessayer.";
          }
        } else if (error.statusCode === 500) {
          if (responseBody?.includes("LinkedIn API error occurred")) {
            friendlyMessage =
              "🔧 Erreur de l'API LinkedIn. Le service peut être temporairement indisponible.";
          } else if (
            responseBody?.includes(
              "An error occurred while processing your request"
            )
          ) {
            friendlyMessage =
              "🔧 Erreur lors du traitement de votre requête. Veuillez réessayer.";
          } else {
            friendlyMessage =
              "🔧 Erreur serveur. Veuillez réessayer plus tard.";
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
          },
          pairedItem: { item: i },
        });
      }
    }

    return [returnData];
  }
}
