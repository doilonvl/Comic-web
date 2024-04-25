export default {
    type: "object",
    required: ["storyId", "chapterNo", "name"],
    properties: {
      storyId: {
        type: "string",
        description: "The id of the story this chapter belongs to",
      },
      chapterNo: {
        type: "integer",
        description: "The number of the chapter. This field is unique.",
      },
      name: {
        type: "string",
        description: "The name of the chapter. This field is unique.",
      },
      publishedDate: {
        type: "string",
        format: "date-time",
        description: "The published date of the chapter",
        default: "The current date",
      },
      isActive: {
        type: "boolean",
        description: "Whether the chapter is active or not",
        default: false,
      },
      status: {
        type: "string",
        description: "The status of the chapter",
        enum: ["draft", "published", "archived"],
        default: "draft",
      },
    },
    example: {
      storyId: "60d3b41f292a3e60d7d5c689",
      chapterNo: 1,
      name: "Chapter 1",
      publishedDate: "2022-01-01T00:00:00Z",
      isActive: true,
      status: "published",
    },
  }