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
    // Toujours utiliser les credentials sauvegardées (plus de custom credentials)
    const credentials = await context.getCredentials("linkupApi");

    if (!credentials) {
      throw new Error(
        "Clé API manquante. Veuillez configurer vos credentials LINKUP dans les paramètres du nœud."
      );
    }

    const apiKey = LinkupUtils.sanitizeCredentialValue(credentials.apiKey as string);
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
        "Clé API manquante. Veuillez configurer vos credentials LINKUP dans les paramètres du nœud."
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
        "User-Agent": "n8n-linkup-node/1.2.0",
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
      commentPost: "/posts/comment",
      extractComments: "/posts/extract-comments",
      answerComment: "/posts/answer-comment",
      searchPosts: "/posts/search",
      createPost: "/posts/create",
      getFeed: "/posts/feed",
      timeSpent: "/posts/time-spent",

      // RECRUITER
      getCandidates: "/recruiter/candidates",
      getCandidateCV: "/recruiter/cv",
      getJobPosts: "/recruiter/job-posts",
      publishJob: "/recruiter/publish-job",
      closeJob: "/recruiter/close-job",
      createJob: "/recruiter/create-job",

      // SIGNAL API (nouveaux)
      extractPostReactions: "/data/signals/posts/reactions",
      extractPostComments: "/data/signals/posts/comments",
      extractProfileReactions: "/data/signals/profile/reactions",
      extractProfileComments: "/data/signals/profile/comments",
      extractProfilePosts: "/data/signals/profile/posts",
      extractCompanyPosts: "/data/signals/company/posts",

      // COMPANY API (nouveaux)
      searchCompaniesApi: "/data/search/companies",
      getCompanyInfoApi: "/data/company/info",
      getCompanyInfoByDomain: "/data/company/info-by-domain",

      // PERSON API (nouveaux)
      searchProfilesApi: "/data/search/profiles",
      extractProfileInfoApi: "/person/extract-info",
      profileEnrichment: "/data/profil/enrich",
    };

    return endpointMap[operation] || "/unknown";
  }
} 