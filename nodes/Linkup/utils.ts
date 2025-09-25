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
    apiKey: string,
    body: RequestBody,
    timeout: number
  ): any {
    return {
      method,
      url: `${LINKUP_API_BASE_URL}${endpoint}`,
      headers: {
        "x-api-key": apiKey,
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
      verifyCode: "/auth/verify",

      // PROFILE
      getMyProfile: "/profile/me",
      searchProfile: "/profile/search",
      getProfileInfo: "/profile/info",

      // COMPANIES
      searchCompanies: "/companies/search",
      getCompanyInfo: "/companies/info",

      // NETWORK
      sendConnectionRequest: "/network/connect",
      getConnections: "/network/connections",
      acceptConnectionInvitation: "/network/accept-invitations",
      getReceivedInvitations: "/network/invitations",
      getSentInvitations: "/network/sent-invitations",
      withdrawInvitation: "/network/withdraw-invitation",
      getNetworkRecommendations: "/network/recommendations",
      getInvitationStatus: "/network/invitation-status",

      // MESSAGES
      sendMessage: "/messages/send-message",
      getMessageInbox: "/messages/inbox",
      getConversationMessages: "/messages/conversation",

      // POSTS
      getPostReactions: "/posts/reactions",
      reactToPost: "/posts/react",
      repost: "/posts/repost",
      repostContent: "/posts/repost",
      commentPost: "/posts/comment",
      addCommentToPost: "/posts/comment",
      extractComments: "/posts/extract-comments",
      getComments: "/posts/extract-comments",
      answerComment: "/posts/answer-comment",
      searchPosts: "/posts/search",
      createPost: "/posts/create",
      getFeed: "/posts/feed",
      getLinkedInFeed: "/posts/feed",
      timeSpent: "/posts/time-spent",
      sendPostTimeSpent: "/posts/time-spent",

      // RECRUITER
      getCandidates: "/recruiter/candidates",
      getCandidateCV: "/recruiter/cv",
      getJobPosts: "/recruiter/job-posts",
      publishJob: "/recruiter/publish-job",
      closeJob: "/recruiter/close-job",
      createJob: "/recruiter/create-job",

      // SIGNAL API (nouveaux)
      "extract post reactions": "/data/signals/posts/reactions",
      "extract post comments": "/data/signals/posts/comments",
      "extract profile reactions": "/data/signals/profile/reactions",
      "extract profile comments": "/data/signals/profile/comments",
      "extract profile posts": "/data/signals/profile/posts",
      "extract company posts": "/data/signals/company/posts",

      // COMPANY API (nouveaux)
      "search companies": "/data/search/companies",
      "get company info": "/data/company/info", 
      "get company info by domain": "/data/company/info-by-domain",

      // PERSON API (nouveaux)
      "search profiles": "/data/search/profiles",
      "extract profile info": "/data/profil/info",
      "profile enrichment": "/data/profil/enrich",
      "extract company employees": "/data/employees/extract",

      // MULTI-REQUESTS
      customRequest: "/custom", // Generic endpoint for custom requests

      // MAIL API (nouveaux)
      emailFinder: "/data/mail/finder",
      emailReverse: "/data/mail/reverse",
      emailValidate: "/data/mail/validate",
    };

    return endpointMap[operation] || "/unknown";
  }
}
