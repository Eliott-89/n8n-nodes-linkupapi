import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class PostOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "getPostReactions":
        const getPostReactionsParams = context.getNodeParameter(
          "postUrlParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!getPostReactionsParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }
        
        if (getPostReactionsParams.post_url) body.post_url = getPostReactionsParams.post_url;
        if (getPostReactionsParams.total_results) body.total_results = getPostReactionsParams.total_results;
        if (getPostReactionsParams.start_page) body.start_page = getPostReactionsParams.start_page;
        if (getPostReactionsParams.end_page) body.end_page = getPostReactionsParams.end_page;
        if (getPostReactionsParams.country) body.country = getPostReactionsParams.country;
        if (getPostReactionsParams.login_token) body.login_token = getPostReactionsParams.login_token;
        break;

      case "reactToPost":
        const reactToPostParams = context.getNodeParameter(
          "reactToPostParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!reactToPostParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }
        
        if (reactToPostParams.post_url) body.post_url = reactToPostParams.post_url;
        if (reactToPostParams.reaction_type) body.reaction_type = reactToPostParams.reaction_type;
        if (reactToPostParams.country) body.country = reactToPostParams.country;
        if (reactToPostParams.login_token) body.login_token = reactToPostParams.login_token;
        break;

      case "addCommentToPost":
        const commentPostParams = context.getNodeParameter(
          "commentPostParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!commentPostParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }
        if (!commentPostParams.message) {
          throw new Error("Message is required for this operation");
        }
        
        if (commentPostParams.post_url) body.post_url = commentPostParams.post_url;
        if (commentPostParams.message) body.message = commentPostParams.message;
        if (commentPostParams.country) body.country = commentPostParams.country;
        if (commentPostParams.login_token) body.login_token = commentPostParams.login_token;
        break;

      case "answerComment":
        const answerCommentParams = context.getNodeParameter(
          "answerCommentParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!answerCommentParams.tracking_id) {
          throw new Error("Tracking ID is required for this operation");
        }
        if (!answerCommentParams.profile_urn) {
          throw new Error("Profile URN is required for this operation");
        }
        if (!answerCommentParams.comment_urn) {
          throw new Error("Comment URN is required for this operation");
        }
        if (!answerCommentParams.comment_text) {
          throw new Error("Comment text is required for this operation");
        }
        
        if (answerCommentParams.tracking_id) body.tracking_id = answerCommentParams.tracking_id;
        if (answerCommentParams.profile_urn) body.profile_urn = answerCommentParams.profile_urn;
        if (answerCommentParams.comment_urn) body.comment_urn = answerCommentParams.comment_urn;
        if (answerCommentParams.login_token) body.login_token = answerCommentParams.login_token;
        if (answerCommentParams.comment_text) body.comment_text = answerCommentParams.comment_text;
        if (answerCommentParams.mention_user !== undefined) body.mention_user = answerCommentParams.mention_user;
        if (answerCommentParams.commenter_name) body.commenter_name = answerCommentParams.commenter_name;
        if (answerCommentParams.country) body.country = answerCommentParams.country;
        break;

      case "createPost":
        const createPostParams = context.getNodeParameter(
          "createPostParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!createPostParams.message) {
          throw new Error("Message is required for this operation");
        }
        
        if (createPostParams.message) body.message = createPostParams.message;
        if (createPostParams.login_token) body.login_token = createPostParams.login_token;
        if (createPostParams.country) body.country = createPostParams.country;
        if (createPostParams.file) body.file = createPostParams.file;
        break;

      case "searchPosts":
        const searchPostsParams = context.getNodeParameter(
          "searchPostsParams",
          itemIndex,
          {}
        ) as any;
        if (searchPostsParams.post_type) body.post_type = searchPostsParams.post_type;
        if (searchPostsParams.sort_by) body.sort_by = searchPostsParams.sort_by;
        if (searchPostsParams.country) body.country = searchPostsParams.country;
        if (searchPostsParams.keyword) body.keyword = searchPostsParams.keyword;
        if (searchPostsParams.post_date) body.post_date = searchPostsParams.post_date;
        if (searchPostsParams.linkedin_url) body.linkedin_url = searchPostsParams.linkedin_url;
        if (searchPostsParams.total_results) body.total_results = searchPostsParams.total_results;
        if (searchPostsParams.start_page) body.start_page = searchPostsParams.start_page;
        if (searchPostsParams.end_page) body.end_page = searchPostsParams.end_page;
        if (searchPostsParams.login_token) body.login_token = searchPostsParams.login_token;
        break;

      case "getLinkedInFeed":
        const getFeedParams = context.getNodeParameter(
          "getFeedParams",
          itemIndex,
          {}
        ) as any;
        if (getFeedParams.total_results) body.total_results = getFeedParams.total_results;
        if (getFeedParams.country) body.country = getFeedParams.country;
        if (getFeedParams.login_token) body.login_token = getFeedParams.login_token;
        break;

      case "getComments":
        const getCommentsParams = context.getNodeParameter(
          "extractCommentsParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!getCommentsParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }
        
        if (getCommentsParams.post_url) body.post_url = getCommentsParams.post_url;
        if (getCommentsParams.total_results) body.total_results = getCommentsParams.total_results;
        if (getCommentsParams.start_page) body.start_page = getCommentsParams.start_page;
        if (getCommentsParams.end_page) body.end_page = getCommentsParams.end_page;
        if (getCommentsParams.country) body.country = getCommentsParams.country;
        if (getCommentsParams.login_token) body.login_token = getCommentsParams.login_token;
        break;

      case "repostContent":
        const repostParams = context.getNodeParameter(
          "postUrlParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!repostParams.postUrl) {
          throw new Error("Post URL is required for this operation");
        }
        
        if (repostParams.postUrl) body.post_url = repostParams.postUrl;
        if (repostParams.country) body.country = repostParams.country;
        break;

      case "sendPostTimeSpent":
        const timeSpentParams = context.getNodeParameter(
          "sendPostTimeSpentParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!timeSpentParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }
        if (!timeSpentParams.duration) {
          throw new Error("Duration is required for this operation");
        }
        
        if (timeSpentParams.post_url) body.post_url = timeSpentParams.post_url;
        if (timeSpentParams.duration) body.duration = timeSpentParams.duration;
        if (timeSpentParams.duration_start_time) body.duration_start_time = timeSpentParams.duration_start_time;
        if (timeSpentParams.login_token) body.login_token = timeSpentParams.login_token;
        if (timeSpentParams.country) body.country = timeSpentParams.country;
        break;
    }

    return body;
  }
}