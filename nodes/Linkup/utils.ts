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
        "Missing API key. Please configure your LINKUP credentials in the node settings."
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
      extractPostReactions: "/signals/posts/reactions",
      extractPostComments: "/signals/posts/comments",
      extractProfileReactions: "/signals/profile/reactions",
      extractProfileComments: "/signals/profile/comments",
      extractProfilePosts: "/signals/profile/posts",
      extractCompanyPosts: "/signals/company/posts",

      // COMPANY API (corrigés)
      searchCompaniesApi: "/search/companies",
      getCompanyInfoApi: "/company/info",
      getCompanyInfoByDomain: "/company/info-by-domain",

      // PERSON API (corrigés)
      searchProfilesApi: "/search/profiles",
      searchProfiles: "/search/profiles", // alias pour searchProfiles
      extractProfileInfoApi: "/profile/extract-info",
      profileEnrichment: "/profile/enrich",
      extractCompanyEmployees: "/company/employees",

      // MULTI-REQUESTS
      customRequest: "/request", // Endpoint générique corrigé
    };

    return endpointMap[operation] || "/unknown";
  }
} 