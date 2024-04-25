export default {
  type: "object",
  required: ["userId", "storyId", "comment"],
  properties: {
    userId: {
      type: "string",
      description: "The id of the user who made the comment",
    },
    storyId: {
      type: "string",
      description: "The id of the story the comment is made on",
    },
    comment: {
      type: "string",
      description: "The comment text",
    },
    isActive: {
      type: "boolean",
      description: "Whether the comment is active or not",
      default: false,
    },
  },
  example: {
    userId: "60d3b41f292a3e60d7d5c689",
    storyId: "60d3b41f292a3e60d7d5c689",
    comment: "This is a comment",
    isActive: true,
  },
};
