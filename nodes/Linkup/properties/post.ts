import { INodeProperties } from "n8n-workflow";

export const postProperties: INodeProperties[] = [
  // Post operations
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["post"],
      },
    },
    options: [
      {
        name: "Get post reactions",
        value: "getPostReactions",
        description: "Get post reactions",
      },
      {
        name: "React to post",
        value: "reactToPost",
        description: "React to a post",
      },
      {
        name: "Repost content",
        value: "repost",
        description: "Repost a post",
      },
      {
        name: "Add comment to post",
        value: "commentPost",
        description: "Comment on a post",
      },
      {
        name: "Get comments",
        value: "extractComments",
        description: "Extract post comments",
      },
      {
        name: "Answer comment",
        value: "answerComment",
        description: "Reply to a comment",
      },
      {
        name: "Search posts",
        value: "searchPosts",
        description: "Search posts",
      },
      {
        name: "Create a post",
        value: "createPost",
        description: "Create a post",
      },
      {
        name: "Get LinkedIn feed",
        value: "getFeed",
        description: "Get feed",
      },
      {
        name: "Send post time spent signal",
        value: "timeSpent",
        description: "Record time spent on a post",
      },
    ],
    default: "getPostReactions",
  },

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
        operation: ["getPostReactions", "reactToPost", "repost", "commentPost", "extractComments", "timeSpent"],
      },
    },
    options: [
      {
        displayName: "Post URL *",
        name: "postUrl",
        type: "string",
        default: "",
        required: true,
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
        displayName: "Reaction Type",
        name: "reactionType",
        type: "options",
        options: [
          { name: "Like", value: "like" },
          { name: "Celebrate", value: "celebrate" },
          { name: "Support", value: "support" },
          { name: "Funny", value: "funny" },
          { name: "Love", value: "love" },
          { name: "Insightful", value: "insightful" },
          { name: "Curious", value: "curious" },
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
        operation: ["commentPost"],
      },
    },
    options: [
      {
        displayName: "Message Text",
        name: "messageText",
        type: "string",
        default: "",
        placeholder: "Great post! Thanks for sharing.",
        description: "Comment content to post",
      },
    ],
  },
  {
    displayName: "Time Spent Parameters",
    name: "timeSpentParams",
    type: "collection",
    placeholder: "Add time spent parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["timeSpent"],
      },
    },
    options: [
      {
        displayName: "Duration (seconds)",
        name: "duration",
        type: "number",
        default: 30,
        description: "Time spent viewing the post in seconds",
      },
      {
        displayName: "Duration Start Time",
        name: "durationStartTime",
        type: "string",
        default: "",
        placeholder: "1640995200",
        description: "Start time timestamp for duration tracking",
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
        displayName: "Tracking ID *",
        name: "trackingId",
        type: "string",
        default: "",
        required: true,
        placeholder: "tracking_id_here",
        description: "Tracking ID for the comment",
      },
      {
        displayName: "Profile URN *",
        name: "profileUrn",
        type: "string",
        default: "",
        required: true,
        placeholder: "urn:li:fsd_profile:123456789",
        description: "Profile URN",
      },
      {
        displayName: "Comment URN *",
        name: "commentUrn",
        type: "string",
        default: "",
        required: true,
        placeholder: "urn:li:activity:123456789",
        description: "Comment URN",
      },
      {
        displayName: "Comment Text *",
        name: "commentText",
        type: "string",
        default: "",
        required: true,
        placeholder: "Great comment!",
        description: "Comment text to post",
      },
      {
        displayName: "Mention User",
        name: "mentionUser",
        type: "boolean",
        default: false,
        description: "Whether to mention the user",
      },
      {
        displayName: "Commenter Name",
        name: "commenterName",
        type: "string",
        default: "",
        placeholder: "John Doe",
        description: "Name of the commenter",
      },
    ],
  },
  {
    displayName: "Create Post Parameters",
    name: "createPostParams",
    type: "collection",
    placeholder: "Add create post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["createPost"],
      },
    },
    options: [
      {
        displayName: "Message Text *",
        name: "messageText",
        type: "string",
        default: "",
        required: true,
        placeholder: "Share your thoughts here...",
        description: "Content for the new post",
      },
      {
        displayName: "File",
        name: "file",
        type: "string",
        default: "",
        placeholder: "file_path_or_url",
        description: "File to attach to the post",
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
        displayName: "Keyword *",
        name: "keyword",
        type: "string",
        default: "",
        required: true,
        placeholder: "AI technology",
        description: "Search keyword for posts",
      },
      {
        displayName: "Post Type",
        name: "post_type",
        type: "string",
        default: "",
        placeholder: "article, video, image",
        description: "Type of post to search for",
      },
      {
        displayName: "Sort By",
        name: "sort_by",
        type: "string",
        default: "",
        placeholder: "relevance, date",
        description: "Sort order for results",
      },
      {
        displayName: "Post Date",
        name: "post_date",
        type: "string",
        default: "",
        placeholder: "2024-01-01",
        description: "Date filter for posts",
      },
      {
        displayName: "LinkedIn URL",
        name: "linkedin_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/in/username",
        description: "LinkedIn profile URL to filter by",
      },
    ],
  },
  {
    displayName: "Common Post Parameters",
    name: "commonPostParams",
    type: "collection",
    placeholder: "Add common parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getPostReactions", "reactToPost", "repost", "commentPost", "extractComments", "timeSpent", "searchPosts"],
      },
    },
    options: [
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
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
    ],
  },
  {
    displayName: "Additional Post Parameters",
    name: "additionalPostParams",
    type: "collection",
    placeholder: "Add additional parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["answerComment", "createPost"],
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
        operation: ["getFeed"],
      },
    },
    options: [
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
    ],
  },
]; 