import { INodeProperties } from "n8n-workflow";

export const postProperties: INodeProperties[] = [
  // POST - Paramètres
  {
    displayName: "Post URL Parameters",
    name: "postUrlParams",
    type: "collection",
    placeholder: "Add post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getPostReactions", "reactToPost", "repostContent", "addCommentToPost", "getComments", "sendPostTimeSpent"],
      },
    },
    options: [
      {
        displayName: "Post URL *",
        name: "postUrl",
        type: "string",
        required: true,
        default: "",
        placeholder: "https://www.linkedin.com/posts/activity-123456789",
        description: "LinkedIn post URL",
      },
    ],
  },
  {
    displayName: "React to Post Parameters",
    name: "reactToPostParams",
    type: "collection",
    placeholder: "Add reaction parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["reactToPost"],
      },
    },
    options: [
      {
        displayName: "Reaction Type *",
        name: "reactionType",
        type: "options",
        required: true,
        options: [
          {
            name: "Like",
            value: "like",
          },
          {
            name: "Celebrate",
            value: "celebrate",
          },
          {
            name: "Support",
            value: "support",
          },
          {
            name: "Funny",
            value: "funny",
          },
          {
            name: "Love",
            value: "love",
          },
          {
            name: "Insightful",
            value: "insightful",
          },
          {
            name: "Curious",
            value: "curious",
          },
        ],
        default: "like",
        description: "Type of reaction to add",
      },
    ],
  },
  {
    displayName: "Comment Post Parameters",
    name: "commentPostParams",
    type: "collection",
    placeholder: "Add comment parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["addCommentToPost"],
      },
    },
    options: [
      {
        displayName: "Comment Text *",
        name: "commentText",
        type: "string",
        required: true,
        default: "",
        placeholder: "Great post! Thanks for sharing.",
        description: "Comment content to add",
      },
    ],
  },
  {
    displayName: "Answer Comment Parameters",
    name: "answerCommentParams",
    type: "collection",
    placeholder: "Add answer parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["answerComment"],
      },
    },
    options: [
      {
        displayName: "Comment ID *",
        name: "commentId",
        type: "string",
        required: true,
        default: "",
        placeholder: "comment_id_here",
        description: "Comment ID to reply to",
      },
      {
        displayName: "Answer Text *",
        name: "answerText",
        type: "string",
        required: true,
        default: "",
        placeholder: "Thank you for your comment!",
        description: "Reply content",
      },
    ],
  },
  {
    displayName: "Search Posts Parameters",
    name: "searchPostsParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["searchPosts"],
      },
    },
    options: [
      {
        displayName: "Keyword",
        name: "keyword",
        type: "string",
        default: "",
        placeholder: "artificial intelligence",
        description: "Keyword to search for in posts",
      },
      {
        displayName: "Post Type",
        name: "post_type",
        type: "string",
        default: "",
        placeholder: "article, video, image, ...",
        description: "Filter by post type",
      },
      {
        displayName: "Sort By",
        name: "sort_by",
        type: "string",
        default: "",
        placeholder: "relevance, date",
        description: "Sorting criteria",
      },
      {
        displayName: "Post Date",
        name: "post_date",
        type: "string",
        default: "",
        placeholder: "YYYY-MM-DD or range",
        description: "Filter by post date",
      },
      {
        displayName: "Profile URL",
        name: "linkedin_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/in/username",
        description: "Filter posts by profile URL",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Start Page",
        name: "start_page",
        type: "number",
        default: 1,
        description: "Starting page number",
      },
      {
        displayName: "End Page",
        name: "end_page",
        type: "number",
        default: 1,
        description: "Ending page number",
      },
    ],
  },
  {
    displayName: "Create Post Parameters",
    name: "createPostParams",
    type: "collection",
    placeholder: "Add post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["createPost"],
      },
    },
    options: [
      {
        displayName: "Post Text *",
        name: "postText",
        type: "string",
        required: true,
        default: "",
        placeholder: "Share your thoughts here...",
        description: "Post content to create",
      },
      {
        displayName: "Post Visibility",
        name: "postVisibility",
        type: "options",
        options: [
          {
            name: "Public",
            value: "public",
          },
          {
            name: "Connections",
            value: "connections",
          },
        ],
        default: "public",
        description: "Who can see this post",
      },
    ],
  },
  {
    displayName: "Get Feed Parameters",
    name: "getFeedParams",
    type: "collection",
    placeholder: "Add feed parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getLinkedInFeed"],
      },
    },
    options: [
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Start Page",
        name: "start_page",
        type: "number",
        default: 1,
        description: "Starting page number",
      },
      {
        displayName: "End Page",
        name: "end_page",
        type: "number",
        default: 1,
        description: "Ending page number",
      },
    ],
  },
  {
    displayName: "Extract Comments Parameters",
    name: "extractCommentsParams",
    type: "collection",
    placeholder: "Add comment parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getComments"],
      },
    },
    options: [
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Start Page",
        name: "start_page",
        type: "number",
        default: 1,
        description: "Starting page number",
      },
      {
        displayName: "End Page",
        name: "end_page",
        type: "number",
        default: 1,
        description: "Ending page number",
      },
    ],
  },
]; 