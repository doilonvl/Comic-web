export default {
  type: "object",
  properties: {
    image: {
      type: "string",
      description: "The image of the story",
    },
    viewCount: {
      type: "integer",
      description: "The view count of the story",
      default: 0,
    },
    isActive: {
      type: "boolean",
      description: "Whether the story is active or not",
      default: false,
    },
    publishedDate: {
      type: "string",
      format: "date-time",
      description: "The published date of the story",
      default: "The current date",
    },
    status: {
      type: "string",
      description: "The status of the story",
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  example: {
    image: "image_url",
    viewCount: 100,
    isActive: true,
    publishedDate: "2022-01-01T00:00:00Z",
    status: "published",
  },
};
