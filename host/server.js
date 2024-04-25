// using module 'express' to initialize a web server
import express, { json } from "express";
import * as dotenv from "dotenv";
// import {productRouter} from "./routes/index.js";
import connectDB from "./database.js";
import cors from "cors";
import {
  categoriesRouter,
  feedbackRouter,
  storyCategoriesRouter,
  storyRouter,
  userRouter,
  commentRouter,
  chapterRouter,
  rateRouter,
  ChapterContentRouter,
} from "./routes/index.js";
import http from "http";
import { Server } from "socket.io";

import fs from "fs";
const dir = "./uploads";

import { swaggerUi, swaggerDocs } from "./swagger.js";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
dotenv.config();

// tạo 1 constant 'app' đại diện cho server express trong ứng dụng
const app = express();

const jwtSecret = process.env.JWT_SECRET;

// thêm middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(json());
app.use(cors());
// kích hoạt hoạt động định tuyến (routing) cho các request của client
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH"],
  },
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    // console.log("User disconnected");
  });
});
app.use("/feedback", feedbackRouter);
app.use("/story", storyRouter);
app.use("/users", userRouter);
app.use("/categories", categoriesRouter);
app.use("/story_categories", storyCategoriesRouter);
app.use("/comment", commentRouter);
app.use("/chapter", chapterRouter);
app.use("/rate", rateRouter);
app.use("/chapterContent", ChapterContentRouter);

// app.use("/products", productRouter);
const port = process.env.PORT || 9999;

app.get("/", (req, res) => {
  res.send(`<h1 style="color:red">Welcome to homepage!</h1>`);
});
// lắng nghe các request gửi tới web server tại port 9999
server.listen(port, async () => {
  connectDB();
  console.log(`Web server listening on http://localhost:${port}`);
});
