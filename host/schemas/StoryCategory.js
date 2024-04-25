export default {
  type: "object",
  required: ["categoryId", "storyId"],
  properties: {
    categoryId: {
      type: "string",
      description: "The id of the category",
    },
    storyId: {
      type: "string",
      description: "The id of the story",
    },
    isActive: {
      type: "boolean",
      description: "Whether the story category is active or not",
      default: false,
    },
  },
  example: {
    categoryId: "60d3b41f292a3e60d7d5c689",
    storyId: "60d3b41f292a3e60d7d5c689",
    isActive: true,
  },
};
