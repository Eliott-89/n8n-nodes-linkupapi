import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class SignalOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "extractPostReactions":
        const extractPostReactionsParams = context.getNodeParameter(
          "extractPostReactionsParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!extractPostReactionsParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }
        
        if (extractPostReactionsParams.post_url) body.post_url = extractPostReactionsParams.post_url;
        if (extractPostReactionsParams.proxy_country) body.proxy_country = extractPostReactionsParams.proxy_country;
        if (extractPostReactionsParams.total_results) body.total_results = extractPostReactionsParams.total_results;

        if (extractPostReactionsParams.start_page) body.start_page = extractPostReactionsParams.start_page;
        if (extractPostReactionsParams.end_page) body.end_page = extractPostReactionsParams.end_page;
        break;

      case "extractPostComments":
        const extractPostCommentsParams = context.getNodeParameter(
          "extractPostCommentsParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!extractPostCommentsParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }
        
        if (extractPostCommentsParams.post_url) body.post_url = extractPostCommentsParams.post_url;
        if (extractPostCommentsParams.proxy_country) body.proxy_country = extractPostCommentsParams.proxy_country;
        if (extractPostCommentsParams.total_results) body.total_results = extractPostCommentsParams.total_results;

        if (extractPostCommentsParams.start_page) body.start_page = extractPostCommentsParams.start_page;
        if (extractPostCommentsParams.end_page) body.end_page = extractPostCommentsParams.end_page;
        break;

      case "extractProfileReactions":
        const extractProfileReactionsParams = context.getNodeParameter(
          "extractProfileReactionsParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!extractProfileReactionsParams.profile_url) {
          throw new Error("Profile URL is required for this operation");
        }
        
        if (extractProfileReactionsParams.profile_url) body.profile_url = extractProfileReactionsParams.profile_url;
        if (extractProfileReactionsParams.proxy_country) body.proxy_country = extractProfileReactionsParams.proxy_country;
        if (extractProfileReactionsParams.total_results) body.total_results = extractProfileReactionsParams.total_results;

        if (extractProfileReactionsParams.start_page) body.start_page = extractProfileReactionsParams.start_page;
        if (extractProfileReactionsParams.end_page) body.end_page = extractProfileReactionsParams.end_page;
        if (extractProfileReactionsParams.cursor) body.cursor = extractProfileReactionsParams.cursor;
        break;

      case "extractProfileComments":
        const extractProfileCommentsParams = context.getNodeParameter(
          "extractProfileCommentsParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!extractProfileCommentsParams.profile_url) {
          throw new Error("Profile URL is required for this operation");
        }
        
        if (extractProfileCommentsParams.profile_url) body.profile_url = extractProfileCommentsParams.profile_url;
        if (extractProfileCommentsParams.proxy_country) body.proxy_country = extractProfileCommentsParams.proxy_country;
        if (extractProfileCommentsParams.total_results) body.total_results = extractProfileCommentsParams.total_results;

        if (extractProfileCommentsParams.start_page) body.start_page = extractProfileCommentsParams.start_page;
        if (extractProfileCommentsParams.end_page) body.end_page = extractProfileCommentsParams.end_page;
        if (extractProfileCommentsParams.cursor) body.cursor = extractProfileCommentsParams.cursor;
        break;

      case "extractProfilePosts":
        const extractProfilePostsParams = context.getNodeParameter(
          "extractProfilePostsParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!extractProfilePostsParams.profile_url) {
          throw new Error("Profile URL is required for this operation");
        }
        
        if (extractProfilePostsParams.profile_url) body.profile_url = extractProfilePostsParams.profile_url;
        if (extractProfilePostsParams.proxy_country) body.proxy_country = extractProfilePostsParams.proxy_country;
        if (extractProfilePostsParams.total_results) body.total_results = extractProfilePostsParams.total_results;
        if (extractProfilePostsParams.post_type) body.post_type = extractProfilePostsParams.post_type;
        if (extractProfilePostsParams.sort_by) body.sort_by = extractProfilePostsParams.sort_by;
        if (extractProfilePostsParams.keyword) body.keyword = extractProfilePostsParams.keyword;
        if (extractProfilePostsParams.post_date) body.post_date = extractProfilePostsParams.post_date;

        if (extractProfilePostsParams.start_page) body.start_page = extractProfilePostsParams.start_page;
        if (extractProfilePostsParams.end_page) body.end_page = extractProfilePostsParams.end_page;
        break;

      case "extractCompanyPosts":
        const extractCompanyPostsParams = context.getNodeParameter(
          "extractCompanyPostsParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!extractCompanyPostsParams.company_url) {
          throw new Error("Company URL is required for this operation");
        }
        
        if (extractCompanyPostsParams.company_url) body.company_url = extractCompanyPostsParams.company_url;
        if (extractCompanyPostsParams.proxy_country) body.proxy_country = extractCompanyPostsParams.proxy_country;
        if (extractCompanyPostsParams.total_results) body.total_results = extractCompanyPostsParams.total_results;
        if (extractCompanyPostsParams.post_type) body.post_type = extractCompanyPostsParams.post_type;
        if (extractCompanyPostsParams.sort_by) body.sort_by = extractCompanyPostsParams.sort_by;
        if (extractCompanyPostsParams.keyword) body.keyword = extractCompanyPostsParams.keyword;
        if (extractCompanyPostsParams.post_date) body.post_date = extractCompanyPostsParams.post_date;

        if (extractCompanyPostsParams.start_page) body.start_page = extractCompanyPostsParams.start_page;
        if (extractCompanyPostsParams.end_page) body.end_page = extractCompanyPostsParams.end_page;
        break;
    }

    return body;
  }
}