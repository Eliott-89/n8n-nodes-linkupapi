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
        
        // Validation des paramètres requis
        if (!getPostReactionsParams.postUrl) {
          throw new Error("L'URL du post est requise pour cette opération");
        }
        
        if (getPostReactionsParams.postUrl) body.post_url = getPostReactionsParams.postUrl;
        break;

      case "reactToPost":
        const reactToPostUrlParams = context.getNodeParameter(
          "postUrlParams",
          itemIndex,
          {}
        ) as any;
        const reactToPostParams = context.getNodeParameter(
          "reactToPostParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!reactToPostUrlParams.postUrl) {
          throw new Error("L'URL du post est requise pour cette opération");
        }
        if (!reactToPostParams.reactionType) {
          throw new Error("Le type de réaction est requis pour cette opération");
        }
        
        if (reactToPostUrlParams.postUrl) body.post_url = reactToPostUrlParams.postUrl;
        if (reactToPostParams.reactionType) body.reaction_type = reactToPostParams.reactionType;
        break;

      case "addCommentToPost":
        const commentPostUrlParams = context.getNodeParameter(
          "postUrlParams",
          itemIndex,
          {}
        ) as any;
        const commentPostParams = context.getNodeParameter(
          "commentPostParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!commentPostUrlParams.postUrl) {
          throw new Error("L'URL du post est requise pour cette opération");
        }
        if (!commentPostParams.commentText) {
          throw new Error("Le texte du commentaire est requis pour cette opération");
        }
        
        if (commentPostUrlParams.postUrl) body.post_url = commentPostUrlParams.postUrl;
        if (commentPostParams.commentText) body.message = commentPostParams.commentText;
        break;

      case "answerComment":
        const answerCommentParams = context.getNodeParameter(
          "answerCommentParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!answerCommentParams.commentId) {
          throw new Error("L'ID du commentaire est requis pour cette opération");
        }
        if (!answerCommentParams.answerText) {
          throw new Error("Le texte de la réponse est requis pour cette opération");
        }
        
        if (answerCommentParams.commentId) body.comment_id = answerCommentParams.commentId;
        if (answerCommentParams.answerText) body.comment_text = answerCommentParams.answerText;
        if (answerCommentParams.country) body.country = answerCommentParams.country;
        break;

      case "createPost":
        const createPostParams = context.getNodeParameter(
          "createPostParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!createPostParams.postText) {
          throw new Error("Le texte du post est requis pour cette opération");
        }
        
        if (createPostParams.postText) body.message = createPostParams.postText;
        if (createPostParams.postVisibility) body.visibility = createPostParams.postVisibility;
        if (createPostParams.country) body.country = createPostParams.country;
        break;

      case "searchPosts":
        const searchPostsParams = context.getNodeParameter(
          "searchPostsParams",
          itemIndex,
          {}
        ) as any;
        if (searchPostsParams.keyword) body.keyword = searchPostsParams.keyword;
        if (searchPostsParams.post_type) body.post_type = searchPostsParams.post_type;
        if (searchPostsParams.sort_by) body.sort_by = searchPostsParams.sort_by;
        if (searchPostsParams.post_date) body.post_date = searchPostsParams.post_date;
        if (searchPostsParams.linkedin_url) body.linkedin_url = searchPostsParams.linkedin_url;
        if (searchPostsParams.total_results) body.total_results = searchPostsParams.total_results;
        if (searchPostsParams.start_page) body.start_page = searchPostsParams.start_page;
        if (searchPostsParams.end_page) body.end_page = searchPostsParams.end_page;
        if (searchPostsParams.country) body.country = searchPostsParams.country;
        break;

      case "getLinkedInFeed":
        const getFeedParams = context.getNodeParameter(
          "getFeedParams",
          itemIndex,
          {}
        ) as any;
        if (getFeedParams.country) body.country = getFeedParams.country;
        if (getFeedParams.total_results) body.total_results = getFeedParams.total_results;
        break;

      case "getComments":
        const getCommentsParams = context.getNodeParameter(
          "postUrlParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!getCommentsParams.postUrl) {
          throw new Error("L'URL du post est requise pour cette opération");
        }
        
        if (getCommentsParams.postUrl) body.post_url = getCommentsParams.postUrl;
        break;

      case "repostContent":
        const repostParams = context.getNodeParameter(
          "postUrlParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!repostParams.postUrl) {
          throw new Error("L'URL du post est requise pour cette opération");
        }
        
        if (repostParams.postUrl) body.post_url = repostParams.postUrl;
        break;

      case "sendPostTimeSpent":
        const timeSpentParams = context.getNodeParameter(
          "postUrlParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!timeSpentParams.postUrl) {
          throw new Error("L'URL du post est requise pour cette opération");
        }
        
        if (timeSpentParams.postUrl) body.post_url = timeSpentParams.postUrl;
        break;
    }

    return body;
  }
}