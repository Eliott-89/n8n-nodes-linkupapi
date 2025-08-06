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
        const extractPostReactionsUrl = context.getNodeParameter(
          "post_url",
          itemIndex,
          ""
        ) as string;
        const signalPostReactionsParams = context.getNodeParameter(
          "signalPostReactionsParams",
          itemIndex,
          {}
        ) as any;
        if (extractPostReactionsUrl) body.post_url = extractPostReactionsUrl;
        if (signalPostReactionsParams.proxy_country)
          body.proxy_country = signalPostReactionsParams.proxy_country;
        if (signalPostReactionsParams.total_results)
          body.total_results = signalPostReactionsParams.total_results;
        if (signalPostReactionsParams.use_pagination !== undefined)
          body.use_pagination = signalPostReactionsParams.use_pagination;
        if (signalPostReactionsParams.start_page)
          body.start_page = signalPostReactionsParams.start_page;
        if (signalPostReactionsParams.end_page)
          body.end_page = signalPostReactionsParams.end_page;
        break;

      case "extractPostComments":
        const extractPostCommentsUrl = context.getNodeParameter(
          "post_url",
          itemIndex,
          ""
        ) as string;
        const signalPostCommentsParams = context.getNodeParameter(
          "signalPostCommentsParams",
          itemIndex,
          {}
        ) as any;
        if (extractPostCommentsUrl) body.post_url = extractPostCommentsUrl;
        if (signalPostCommentsParams.proxy_country)
          body.proxy_country = signalPostCommentsParams.proxy_country;
        if (signalPostCommentsParams.total_results)
          body.total_results = signalPostCommentsParams.total_results;
        if (signalPostCommentsParams.use_pagination !== undefined)
          body.use_pagination = signalPostCommentsParams.use_pagination;
        if (signalPostCommentsParams.start_page)
          body.start_page = signalPostCommentsParams.start_page;
        if (signalPostCommentsParams.end_page)
          body.end_page = signalPostCommentsParams.end_page;
        break;

      case "extractProfileReactions":
        const extractProfileReactionsUrl = context.getNodeParameter(
          "profile_url",
          itemIndex,
          ""
        ) as string;
        const signalProfileReactionsParams = context.getNodeParameter(
          "signalProfileReactionsParams",
          itemIndex,
          {}
        ) as any;
        if (extractProfileReactionsUrl) body.profile_url = extractProfileReactionsUrl;
        if (signalProfileReactionsParams.proxy_country)
          body.proxy_country = signalProfileReactionsParams.proxy_country;
        if (signalProfileReactionsParams.total_results)
          body.total_results = signalProfileReactionsParams.total_results;
        if (signalProfileReactionsParams.start_page)
          body.start_page = signalProfileReactionsParams.start_page;
        if (signalProfileReactionsParams.end_page)
          body.end_page = signalProfileReactionsParams.end_page;
        if (signalProfileReactionsParams.cursor)
          body.cursor = signalProfileReactionsParams.cursor;
        break;

      case "extractProfileComments":
        const extractProfileCommentsUrl = context.getNodeParameter(
          "profile_url",
          itemIndex,
          ""
        ) as string;
        const signalProfileCommentsParams = context.getNodeParameter(
          "signalProfileCommentsParams",
          itemIndex,
          {}
        ) as any;
        if (extractProfileCommentsUrl) body.profile_url = extractProfileCommentsUrl;
        if (signalProfileCommentsParams.proxy_country)
          body.proxy_country = signalProfileCommentsParams.proxy_country;
        if (signalProfileCommentsParams.total_results)
          body.total_results = signalProfileCommentsParams.total_results;
        if (signalProfileCommentsParams.start_page)
          body.start_page = signalProfileCommentsParams.start_page;
        if (signalProfileCommentsParams.end_page)
          body.end_page = signalProfileCommentsParams.end_page;
        if (signalProfileCommentsParams.cursor)
          body.cursor = signalProfileCommentsParams.cursor;
        break;

      case "extractProfilePosts":
        const extractProfilePostsUrl = context.getNodeParameter(
          "profile_url",
          itemIndex,
          ""
        ) as string;
        const signalProfilePostsParams = context.getNodeParameter(
          "signalProfilePostsParams",
          itemIndex,
          {}
        ) as any;
        if (extractProfilePostsUrl) body.profile_url = extractProfilePostsUrl;
        if (signalProfilePostsParams.proxy_country)
          body.proxy_country = signalProfilePostsParams.proxy_country;
        if (signalProfilePostsParams.total_results)
          body.total_results = signalProfilePostsParams.total_results;
        if (signalProfilePostsParams.post_type)
          body.post_type = signalProfilePostsParams.post_type;
        if (signalProfilePostsParams.sort_by)
          body.sort_by = signalProfilePostsParams.sort_by;
        if (signalProfilePostsParams.keyword)
          body.keyword = signalProfilePostsParams.keyword;
        if (signalProfilePostsParams.post_date)
          body.post_date = signalProfilePostsParams.post_date;
        if (signalProfilePostsParams.use_pagination !== undefined)
          body.use_pagination = signalProfilePostsParams.use_pagination;
        if (signalProfilePostsParams.start_page)
          body.start_page = signalProfilePostsParams.start_page;
        if (signalProfilePostsParams.end_page)
          body.end_page = signalProfilePostsParams.end_page;
        break;

      case "extractCompanyPosts":
        const extractCompanyPostsUrl = context.getNodeParameter(
          "company_url",
          itemIndex,
          ""
        ) as string;
        const signalCompanyPostsParams = context.getNodeParameter(
          "signalCompanyPostsParams",
          itemIndex,
          {}
        ) as any;
        if (extractCompanyPostsUrl) body.company_url = extractCompanyPostsUrl;
        if (signalCompanyPostsParams.proxy_country)
          body.proxy_country = signalCompanyPostsParams.proxy_country;
        if (signalCompanyPostsParams.total_results)
          body.total_results = signalCompanyPostsParams.total_results;
        if (signalCompanyPostsParams.post_type)
          body.post_type = signalCompanyPostsParams.post_type;
        if (signalCompanyPostsParams.sort_by)
          body.sort_by = signalCompanyPostsParams.sort_by;
        if (signalCompanyPostsParams.keyword)
          body.keyword = signalCompanyPostsParams.keyword;
        if (signalCompanyPostsParams.post_date)
          body.post_date = signalCompanyPostsParams.post_date;
        if (signalCompanyPostsParams.use_pagination !== undefined)
          body.use_pagination = signalCompanyPostsParams.use_pagination;
        if (signalCompanyPostsParams.start_page)
          body.start_page = signalCompanyPostsParams.start_page;
        if (signalCompanyPostsParams.end_page)
          body.end_page = signalCompanyPostsParams.end_page;
        break;
    }

    return body;
  }
} 