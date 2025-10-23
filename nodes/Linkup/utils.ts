import { IExecuteFunctions } from "n8n-workflow";
import { LinkupCredentials, RequestBody, LINKUP_API_BASE_URL } from "./types";

export class LinkupUtils {
  static sanitizeCredentialValue(value: string): string | null {
    if (!value || value.includes("__n8n_BLANK_VALUE_")) {
      return null;
    }
    return value;
  }

  static async getCredentialsWithFallback(
    context: IExecuteFunctions
  ): Promise<LinkupCredentials> {
    // Always use saved credentials (no more custom credentials)
    const credentials = await context.getCredentials("linkupApi");

    if (!credentials) {
      throw new Error(
        "Missing API key. Please configure your LINKUP credentials in the node settings."
      );
    }

    const apiKey = LinkupUtils.sanitizeCredentialValue(
      credentials.apiKey as string
    );
    const email = LinkupUtils.sanitizeCredentialValue(
      credentials.linkedinEmail as string
    );
    const password = LinkupUtils.sanitizeCredentialValue(
      credentials.linkedinPassword as string
    );
    const country = LinkupUtils.sanitizeCredentialValue(
      credentials.country as string
    );
    const loginToken = LinkupUtils.sanitizeCredentialValue(
      credentials.loginToken as string
    );

    if (!apiKey) {
      throw new Error(
        "Missing API key. Please configure your LINKUP credentials in the node settings."
      );
    }

    // Debug: log de la longueur de l'API key (sans exposer la valeur)

    // Vérification basique du format de l'API key
    if (apiKey.length < 10) {
      throw new Error(
        "API key seems too short. Please verify your LINKUP API key."
      );
    }

    return {
      apiKey: apiKey!,
      email: email || "",
      password: password || "",
      country: country || "FR",
      loginToken: loginToken || "",
    };
  }

  static buildRequestOptions(
    endpoint: string,
    method: "POST" | "GET",
    body: RequestBody,
    timeout: number
  ): any {
    return {
      method,
      url: `${LINKUP_API_BASE_URL}${endpoint}`,
      headers: {
        "Content-Type": "application/json",
      },
      body,
      timeout,
    };
  }

  static getEndpointForOperation(operation: string): string {
    const endpointMap: Record<string, string> = {
      // AUTH
      login: "/auth/login",
      "verify code": "/auth/verify",

      // PROFILE
      "get my profile": "/profile/me",
      "search profile": "/profile/search",
      "get profile info": "/profile/info",

      // NETWORK
      "send connection request": "/network/connect",
      "get connections": "/network/connections",
      "accept connection invitation": "/network/accept-invitations",
      "get received invitations": "/network/invitations",
      "get sent invitations": "/network/sent-invitations",
      "withdraw invitation": "/network/withdraw-invitation",
      "get network recommendations": "/network/recommendations",
      "get invitation status": "/network/invitation-status",

      // MESSAGES
      "send message": "/messages/send-message",
      "get message inbox": "/messages/inbox",
      "get conversation messages": "/messages/conversation",

      // POSTS
      "get post reactions": "/posts/reactions",
      "react to post": "/posts/react",
      "repost content": "/posts/repost",
      "add comment to post": "/posts/comment",
      "get comments": "/posts/extract-comments",
      "answer comment": "/posts/answer-comment",
      "search posts": "/posts/search",
      "create post": "/posts/create",
      "get linkedin feed": "/posts/feed",

      // RECRUITER
      "get candidates": "/recruiter/candidates",
      "get candidate cv": "/recruiter/cv",
      "get job posts": "/recruiter/job-posts",
      "publish job": "/recruiter/publish-job",
      "close job": "/recruiter/close-job",
      "create job": "/recruiter/create-job",


      // COMPANY API (nouveaux)
      "search companies": "/data/search/companies",
      "get company info": "/data/company/info",
      "get company info by domain": "/data/company/info-by-domain",

      // PERSON API (nouveaux)
      "search profiles": "/data/search/profiles",
      "extract profile info": "/data/profil/info",
      "profile enrichment": "/data/profil/enrich",

      // MULTI-REQUESTS
      "custom request": "/custom", // Generic endpoint for custom requests

      // MAIL API (nouveaux)
      "email finder": "/data/mail/finder",
      "email reverse": "/data/mail/reverse",
      "email validate": "/data/mail/validate",
    };

    return endpointMap[operation] || "/unknown";
  }
}
