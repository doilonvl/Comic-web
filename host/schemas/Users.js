export default {
  type: "object",
  required: ["userName", "phoneNumber", "password", "email", "status"],
  properties: {
    userName: {
      type: "string",
      description: "The name of the user",
    },
    phoneNumber: {
      type: "string",
      description: "The phone number of the user",
    },
    password: {
      type: "string",
      description: "The password of the user",
    },
    email: {
      type: "string",
      description: "The email of the user",
    },
    status: {
      type: "string",
      description: "The status of the user",
      default: "active",
    },
    img: {
      type: "string",
      description: "The image of the user",
    },
    role: {
      type: "integer",
      description: "The role of the user",
      default: 1,
    },
  },
  example: {
    userName: "John Doe",
    phoneNumber: "1234567890",
    password: "password",
    email: "john.doe@example.com",
    status: "active",
    img: "image.jpg",
    role: 1,
  },
};
