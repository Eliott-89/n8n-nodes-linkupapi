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
      case "reactToPost":
      case "repost":
      case "commentPost":
      case "extractComments":
      case "timeSpent":
        const postsParams = context.getNodeParameter(
          "postsParams",
          itemIndex,
          {}
        ) as any;
        
        if (postsParams.postUrl) body.post_url = postsParams.postUrl;
        if (postsParams.country) body.country = postsParams.country;
        if (operation === "reactToPost" && postsParams.reactionType) {
          body.reaction_type = postsParams.reactionType;
        }
        if (operation === "commentPost" && postsParams.messageText) {
          body.message = postsParams.messageText;
        }
        if (operation === "timeSpent") {
          if (postsParams.duration) body.duration = Math.floor(postsParams.duration);
          if (postsParams.durationStartTime) body.duration_start_time = Math.floor(parseInt(postsParams.durationStartTime));
        }
        if (
          operation === "getPostReactions" ||
          operation === "extractComments"
        ) {
          if (postsParams.total_results) body.total_results = postsParams.total_results;
          if (postsParams.start_page) body.start_page = postsParams.start_page;
          if (postsParams.end_page) body.end_page = postsParams.end_page;
        }
        break;

      case "answerComment":
        const answerCommentParams = context.getNodeParameter(
          "answerCommentParams",
          itemIndex,
          {}
        ) as any;
        if (answerCommentParams.trackingId) body.tracking_id = answerCommentParams.trackingId;
        if (answerCommentParams.profileUrn) body.profile_urn = answerCommentParams.profileUrn;
        if (answerCommentParams.commentUrn) body.comment_urn = answerCommentParams.commentUrn;
        if (answerCommentParams.commentText) body.comment_text = answerCommentParams.commentText;
        if (answerCommentParams.mentionUser !== undefined) body.mention_user = answerCommentParams.mentionUser;
        if (answerCommentParams.commenterName) body.commenter_name = answerCommentParams.commenterName;
        if (answerCommentParams.country) body.country = answerCommentParams.country;
        break;

      case "createPost":
        const createPostParams = context.getNodeParameter(
          "createPostParams",
          itemIndex,
          {}
        ) as any;
        if (createPostParams.messageText) body.message = createPostParams.messageText;
        if (createPostParams.file) body.file = createPostParams.file;
        if (createPostParams.country) body.country = createPostParams.country;
        break;

      case "searchPosts":
        const searchPostsParams = context.getNodeParameter(
          "searchPostsParams",
          itemIndex,
          {}
        ) as any;
        if (searchPostsParams.keyword) body.keyword = searchPostsParams.keyword;
        if (searchPostsParams.post_type)
          body.post_type = searchPostsParams.post_type;
        if (searchPostsParams.sort_by) body.sort_by = searchPostsParams.sort_by;
        if (searchPostsParams.post_date)
          body.post_date = searchPostsParams.post_date;
        if (searchPostsParams.linkedin_url)
          body.linkedin_url = searchPostsParams.linkedin_url;
        if (searchPostsParams.total_results)
          body.total_results = searchPostsParams.total_results;
        if (searchPostsParams.start_page)
          body.start_page = searchPostsParams.start_page;
        if (searchPostsParams.end_page)
          body.end_page = searchPostsParams.end_page;
        if (searchPostsParams.country) body.country = searchPostsParams.country;
        break;

      case "getFeed":
        const getFeedParams = context.getNodeParameter(
          "getFeedParams",
          itemIndex,
          {}
        ) as any;
        if (getFeedParams.country) body.country = getFeedParams.country;
        if (getFeedParams.total_results)
          body.total_results = getFeedParams.total_results;
        break;
    }

    return body;
  }
} 