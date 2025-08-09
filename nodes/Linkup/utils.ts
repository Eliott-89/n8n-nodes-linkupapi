import { IExecuteFunctions } from "n8n-workflow";
import { LinkupCredentials, RequestBody, LINKUP_API_BASE_URL } from "./types";

export class LinkupUtils {
  static sanitizeCredentialValue(value: any): string | null {
    if (!value || 
        value === undefined || 
        value === null || 
        value === "" || 
        typeof value !== 'string' ||
        value.includes("__n8n_BLANK_VALUE_") ||
        value.trim() === "") {
      return null;
    }
    return value.trim();
  }

  static async getCredentialsWithFallback(
    context: IExecuteFunctions
  ): Promise<LinkupCredentials> {
    try {
      // Always use saved credentials (no more custom credentials)
      const credentials = await context.getCredentials("linkupApi");

      if (!credentials) {
        throw new Error(
          "❌ No LINKUP credentials found. Please configure your LINKUP API credentials in the node settings."
        );
      }

      // Debug: log les clés disponibles (sans valeurs sensibles)
      const availableKeys = Object.keys(credentials);
      console.log("📝 LINKUP Debug - Available credential keys:", availableKeys);

      const apiKey = LinkupUtils.sanitizeCredentialValue(credentials.apiKey);
      const email = LinkupUtils.sanitizeCredentialValue(credentials.linkedinEmail);
      const password = LinkupUtils.sanitizeCredentialValue(credentials.linkedinPassword);
      const country = LinkupUtils.sanitizeCredentialValue(credentials.country);
      const loginToken = LinkupUtils.sanitizeCredentialValue(credentials.loginToken);

      if (!apiKey) {
        throw new Error(
          "❌ API Key is missing or invalid. Please check your LINKUP API key in the credentials settings. Make sure it's not empty and doesn't contain special characters."
        );
      }

      // Valider le format de l'API key (généralement alphanumérique)
      if (!/^[a-zA-Z0-9_-]+$/.test(apiKey)) {
        throw new Error(
          "❌ API Key format appears invalid. LINKUP API keys should contain only letters, numbers, underscores and hyphens."
        );
      }

      console.log("✅ LINKUP Debug - API Key format validated, length:", apiKey.length);

      return {
        apiKey: apiKey!,
        email: email || "",
        password: password || "",
        country: country || "FR",
        loginToken: loginToken || "",
      };
    } catch (error: any) {
      console.error("🚨 LINKUP Credentials Error:", error.message);
      throw error;
    }
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
        "User-Agent": "n8n-linkup-node/2.4.26",
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
      extractProfileInfo: "/profile/info",
      searchProfile: "/profile/search",

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
      sendMessage: "/messages/send",
      getMessageInbox: "/messages/inbox",
      getConversationMessages: "/messages/conversation-messages",

      // POSTS
      getPostReactions: "/posts/reactions",
      reactToPost: "/posts/react",
      repost: "/posts/repost",
      repostContent: "/posts/repost", // alias pour repostContent
      commentPost: "/posts/comment",
      addCommentToPost: "/posts/comment", // alias pour addCommentToPost
      extractComments: "/posts/comments",
      getComments: "/posts/comments", // alias pour getComments
      answerComment: "/posts/answer-comment",
      searchPosts: "/posts/search",
      createPost: "/posts/create",
      getFeed: "/posts/feed",
      getLinkedInFeed: "/posts/feed", // alias pour getLinkedInFeed
      timeSpent: "/posts/time-spent",
      sendPostTimeSpent: "/posts/time-spent", // alias pour sendPostTimeSpent

      // RECRUITER
      getCandidates: "/recruiter/candidates",
      getCandidateCV: "/recruiter/cv",
      getJobPosts: "/recruiter/job-posts",
      publishJob: "/recruiter/publish-job",
      closeJob: "/recruiter/close-job",
      createJob: "/recruiter/create-job",

      // SIGNAL API (corrigés)
      extractPostReactions: "/posts/reactions",
      extractPostComments: "/posts/comments",
      extractProfileReactions: "/profile/reactions",
      extractProfileComments: "/profile/comments",
      extractProfilePosts: "/profile/posts",
      extractCompanyPosts: "/companies/posts",

      // COMPANY API (corrigés)
      searchCompaniesApi: "/companies/search",
      getCompanyInfoApi: "/companies/info",
      getCompanyInfoByDomain: "/companies/info-by-domain",

      // PERSON API (corrigés)
      searchProfilesApi: "/profile/search",
      searchProfiles: "/profile/search", // alias pour searchProfiles
      extractProfileInfoApi: "/profile/info",
      profileEnrichment: "/profile/enrich",
      extractCompanyEmployees: "/companies/employees",

      // MULTI-REQUESTS
      customRequest: "/request", // Endpoint générique corrigé
    };

    return endpointMap[operation] || "/unknown";
  }
} 