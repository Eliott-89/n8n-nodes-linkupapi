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
      case "get post reactions":
        const getPostReactionsParams = context.getNodeParameter(
          "getPostReactionsParams",
          itemIndex,
          {}
        ) as any;

        // Required parameters validation
        if (!getPostReactionsParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }

        if (getPostReactionsParams.post_url)
          body.post_url = getPostReactionsParams.post_url;
        if (getPostReactionsParams.total_results)
          body.total_results = getPostReactionsParams.total_results;
        if (getPostReactionsParams.start_page)
          body.start_page = getPostReactionsParams.start_page;
        if (getPostReactionsParams.end_page)
          body.end_page = getPostReactionsParams.end_page;
        // country from node params removed; credentials will inject it
        break;

      case "react to post":
        const reactToPostParams = context.getNodeParameter(
          "reactToPostParams",
          itemIndex,
          {}
        ) as any;

        // Required parameters validation
        if (!reactToPostParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }

        if (reactToPostParams.post_url)
          body.post_url = reactToPostParams.post_url;
        if (reactToPostParams.reaction_type)
          body.reaction_type = reactToPostParams.reaction_type;
        // country from node params removed; credentials will inject it
        break;

      case "add comment to post":
        const commentPostParams = context.getNodeParameter(
          "addCommentToPostParams",
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

        if (commentPostParams.post_url)
          body.post_url = commentPostParams.post_url;
        if (commentPostParams.message) body.message = commentPostParams.message;
        break;

      case "answer comment":
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

        if (answerCommentParams.tracking_id)
          body.tracking_id = answerCommentParams.tracking_id;
        if (answerCommentParams.profile_urn)
          body.profile_urn = answerCommentParams.profile_urn;
        if (answerCommentParams.comment_urn)
          body.comment_urn = answerCommentParams.comment_urn;
        if (answerCommentParams.comment_text)
          body.comment_text = answerCommentParams.comment_text;
        if (answerCommentParams.mention_user !== undefined)
          body.mention_user = answerCommentParams.mention_user;
        if (answerCommentParams.commenter_name)
          body.commenter_name = answerCommentParams.commenter_name;
        // country from node params removed; credentials will inject it
        break;

      case "create post":
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
        // country from node params removed; credentials will inject it
        if (createPostParams.file) body.file = createPostParams.file;
        break;

      case "search posts":
        const searchPostsParams = context.getNodeParameter(
          "searchPostsParams",
          itemIndex,
          {}
        ) as any;
        if (searchPostsParams.post_type)
          body.post_type = searchPostsParams.post_type;
        if (searchPostsParams.sort_by) body.sort_by = searchPostsParams.sort_by;
        if (searchPostsParams.keyword) body.keyword = searchPostsParams.keyword;
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
        break;

      case "get linkedin feed":
        const getFeedParams = context.getNodeParameter(
          "getFeedParams",
          itemIndex,
          {}
        ) as any;
        if (getFeedParams.total_results)
          body.total_results = getFeedParams.total_results;
        // country from node params removed; credentials will inject it
        break;

      case "get comments":
        const getCommentsParams = context.getNodeParameter(
          "getCommentsParams",
          itemIndex,
          {}
        ) as any;

        // Required parameters validation
        if (!getCommentsParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }

        if (getCommentsParams.post_url)
          body.post_url = getCommentsParams.post_url;
        if (getCommentsParams.total_results)
          body.total_results = getCommentsParams.total_results;
        if (getCommentsParams.start_page)
          body.start_page = getCommentsParams.start_page;
        if (getCommentsParams.end_page)
          body.end_page = getCommentsParams.end_page;
        break;

      case "repost content":
        const repostParams = context.getNodeParameter(
          "repostContentParams",
          itemIndex,
          {}
        ) as any;

        // Required parameters validation
        if (!repostParams.post_url) {
          throw new Error("Post URL is required for this operation");
        }

        if (repostParams.post_url) body.post_url = repostParams.post_url;
        break;

    }

    // Inject country from credentials (overrides any param)
    const creds = await context.getCredentials("linkupApi");
    if (creds && (creds as any).country) {
      (body as any).country = (creds as any).country;
    }

    return body;
  }
}
