export default {
  type: "object",
  required: ["chapterId", "paragraphs"],
  properties: {
    chapterId: {
      type: "string",
      description: "The id of the chapter this content belongs to",
    },
    paragraphs: {
      type: "array",
      items: {
        type: "string",
      },
      description: "The paragraphs of the chapter content",
    },
    status: {
      type: "string",
      description: "The status of the chapter content",
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  example: {
    chapterId: "60d3b41f292a3e60d7d5c689",
    paragraphs: ["Paragraph 1", "Paragraph 2"],
    status: "published",
  },
};
