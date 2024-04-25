import express from "express";
import feedbackController from "../../controllers/feedbackController/index.js";

const feedbackRouter = express.Router();

feedbackRouter.get("/:storyId", feedbackController.filterFeedback);
feedbackRouter.post("/add_new", feedbackController.addNewFeedback);
feedbackRouter.patch("/recall_message/:fid", feedbackController.updateFeedback);
feedbackRouter.delete(
  "/delete_message/:fid",
  feedbackController.deleteFeedback
);

export default feedbackRouter;
