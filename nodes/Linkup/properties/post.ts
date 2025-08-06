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
    displayName: "Post URL *",
    name: "postUrl",
    type: "string",
    default: "",
    required: true,
    placeholder: "https://www.linkedin.com/posts/activity-123456789",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getPostReactions", "reactToPost", "repost", "commentPost", "extractComments", "timeSpent"],
      },
    },
    description: "LinkedIn post URL",
  },
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
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["reactToPost"],
      },
    },
    description: "Type of reaction to add",
  },
  {
    displayName: "Message Text",
    name: "messageText",
    type: "string",
    default: "",
    placeholder: "Great post! Thanks for sharing.",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["commentPost"],
      },
    },
    description: "Comment content to post",
  },
  {
    displayName: "Duration (seconds)",
    name: "duration",
    type: "number",
    default: 30,
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["timeSpent"],
      },
    },
    description: "Time spent viewing the post in seconds",
  },
  {
    displayName: "Duration Start Time",
    name: "durationStartTime",
    type: "string",
    default: "",
    placeholder: "1640995200",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["timeSpent"],
      },
    },
    description: "Start time timestamp for duration tracking",
  },
  {
    displayName: "Tracking ID *",
    name: "trackingId",
    type: "string",
    default: "",
    required: true,
    placeholder: "tracking_id_here",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["answerComment"],
      },
    },
    description: "Tracking ID for the comment",
  },
  {
    displayName: "Profile URN *",
    name: "profileUrn",
    type: "string",
    default: "",
    required: true,
    placeholder: "urn:li:fsd_profile:123456789",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["answerComment"],
      },
    },
    description: "Profile URN",
  },
  {
    displayName: "Comment URN *",
    name: "commentUrn",
    type: "string",
    default: "",
    required: true,
    placeholder: "urn:li:activity:123456789",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["answerComment"],
      },
    },
    description: "Comment URN",
  },
  {
    displayName: "Comment Text *",
    name: "commentText",
    type: "string",
    default: "",
    required: true,
    placeholder: "Great comment!",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["answerComment"],
      },
    },
    description: "Comment text to post",
  },
  {
    displayName: "Mention User",
    name: "mentionUser",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["answerComment"],
      },
    },
    description: "Whether to mention the user",
  },
  {
    displayName: "Commenter Name",
    name: "commenterName",
    type: "string",
    default: "",
    placeholder: "John Doe",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["answerComment"],
      },
    },
    description: "Name of the commenter",
  },
  {
    displayName: "Message Text *",
    name: "messageText",
    type: "string",
    default: "",
    required: true,
    placeholder: "Share your thoughts here...",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["createPost"],
      },
    },
    description: "Content for the new post",
  },
  {
    displayName: "File",
    name: "file",
    type: "string",
    default: "",
    placeholder: "file_path_or_url",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["createPost"],
      },
    },
    description: "File to attach to the post",
  },
  {
    displayName: "Keyword *",
    name: "keyword",
    type: "string",
    default: "",
    required: true,
    placeholder: "AI technology",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["searchPosts"],
      },
    },
    description: "Search keyword for posts",
  },
  {
    displayName: "Post Type",
    name: "post_type",
    type: "string",
    default: "",
    placeholder: "article, video, image",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["searchPosts"],
      },
    },
    description: "Type of post to search for",
  },
  {
    displayName: "Sort By",
    name: "sort_by",
    type: "string",
    default: "",
    placeholder: "relevance, date",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["searchPosts"],
      },
    },
    description: "Sort order for results",
  },
  {
    displayName: "Post Date",
    name: "post_date",
    type: "string",
    default: "",
    placeholder: "2024-01-01",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["searchPosts"],
      },
    },
    description: "Date filter for posts",
  },
  {
    displayName: "LinkedIn URL",
    name: "linkedin_url",
    type: "string",
    default: "",
    placeholder: "https://www.linkedin.com/in/username",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["searchPosts"],
      },
    },
    description: "LinkedIn profile URL to filter by",
  },
  {
    displayName: "Total Results",
    name: "total_results",
    type: "number",
    default: 10,
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getPostReactions", "reactToPost", "repost", "commentPost", "extractComments", "timeSpent", "searchPosts"],
      },
    },
    description: "Number of results to return",
  },
  {
    displayName: "Start Page",
    name: "start_page",
    type: "number",
    default: 1,
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getPostReactions", "reactToPost", "repost", "commentPost", "extractComments", "timeSpent", "searchPosts"],
      },
    },
    description: "Starting page number",
  },
  {
    displayName: "End Page",
    name: "end_page",
    type: "number",
    default: 1,
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getPostReactions", "reactToPost", "repost", "commentPost", "extractComments", "timeSpent", "searchPosts"],
      },
    },
    description: "Ending page number",
  },
  {
    displayName: "Country",
    name: "country",
    type: "string",
    default: "FR",
    placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getPostReactions", "reactToPost", "repost", "commentPost", "extractComments", "timeSpent", "answerComment", "createPost", "searchPosts"],
      },
    },
    description: "Country code for proxy selection",
  },
  {
    displayName: "Total Results",
    name: "total_results",
    type: "number",
    default: 10,
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getFeed"],
      },
    },
    description: "Number of results to return",
  },
  {
    displayName: "Country",
    name: "country",
    type: "string",
    default: "FR",
    placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["getFeed"],
      },
    },
    description: "Country code for proxy selection",
  },
]; 