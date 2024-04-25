import express from "express";
import storyController from "../../controllers/storyController/index.js";
import authenticate from "../../middleware/authenticate.js";
import upload from "../../middleware/multer.js";
import Story from "../../models/Story.js";

const storyRouter = express.Router();

storyRouter.get("/get_story/:storyId", storyController.getStoryById);
storyRouter.put("/update_story/:id", storyController.updateStory);
storyRouter.get("/get_list_stories", storyController.getStoriesByUser);
storyRouter.post("/create_story", storyController.createStory);
storyRouter.get("/get_stories", storyController.getStories);
storyRouter.get("/top_stories", storyController.topViewStories);

/**
 * @swagger
 * /story/follow/{storyId}:
 *   post:
 *     tags:
 *       - Story
 *     summary: Follow a story
 *     description: This can only be done by the logged in user.
 *     security:
 *       - BearerAuth: []
 *     operationId: followStory
 *     parameters:
 *       - name: storyId
 *         in: path
 *         description: ID of story that needs to be followed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Followed the story successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Followed the story successfully.
 *       '401':
 *         description: User is not authenticated
 *       '500':
 *         description: An error occurred while trying to follow the story
 */
storyRouter.post("/follow/:storyId", authenticate, storyController.followStory);

/**
 * @swagger
 * /story/unfollow/{storyId}:
 *   post:
 *     tags:
 *       - Story
 *     summary: Unfollow a story
 *     description: This can only be done by the logged in user.
 *     security:
 *       - BearerAuth: []
 *     operationId: unfollowStory
 *     parameters:
 *       - name: storyId
 *         in: path
 *         description: ID of story that needs to be unfollowed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Unfollowed the story successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unfollowed the story successfully.
 *       '401':
 *         description: User is not authenticated
 *       '500':
 *         description: An error occurred while trying to unfollow the story
 */
storyRouter.post(
  "/unfollow/:storyId",
  authenticate,
  storyController.unfollowStory
);

/**
 * @swagger
 * /story/follows:
 *   get:
 *     tags:
 *       - Story
 *     summary: Get the list of stories the user is following
 *     description: This can only be done by the logged in user.
 *     operationId: getFollowingStories
 *     security:
 *       - BearerAuth: []   # use the security scheme named 'BearerAuth'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 *       '401':
 *         description: User is not authenticated
 *       '500':
 *         description: An error occurred while trying to get the follow list
 */
storyRouter.get("/follows", authenticate, storyController.getFollowingStories);
storyRouter.get("/follow_story/:storyId", storyController.getFollowByStory);

/**
 * @swagger
 * /story/{id}/active:
 *   get:
 *     tags:
 *       - Story
 *     summary: Active story
 *     operationId: getFollowingStories
 *     security:
 *       - BearerAuth: []   # use the security scheme named 'BearerAuth'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 *       '401':
 *         description: User is not authenticated
 *       '500':
 *         description: An error occurred while trying to get the follow list
 */
storyRouter.get("/:id/active", authenticate, storyController.activeStory);

/**
 * @swagger
 * /story/{id}/finished:
 *   get:
 *     tags:
 *       - Story
 *     summary: Get the list of stories the user is following
 *     description: This can only be done by the logged in user.
 *     operationId: getFollowingStories
 *     security:
 *       - BearerAuth: []   # use the security scheme named 'BearerAuth'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 *       '401':
 *         description: User is not authenticated
 *       '500':
 *         description: An error occurred while trying to get the follow list
 */
storyRouter.get("/:id/finished", authenticate, storyController.finished);
storyRouter.get("/search/:search", storyController.searchStory);
storyRouter.get(
  "/content/:storyId/:chapterNo",
  storyController.findHistoryStory
);
storyRouter.get(
  "/chapterContent/:chapterId",
  storyController.getChapterContent
);
storyRouter.get("/chapters/:storyId", storyController.getAllChapter);
storyRouter.put("/update_view_count/:id", storyController.updateViewCount);
storyRouter.get("/updated", storyController.getStoryUpdated);

/**
 * @swagger
 * /story/get_stories_by_status:
 *   get:
 *     tags:
 *       - Story
 *     summary: Get stories by status
 *     description: This can only be done by the logged in user.
 *     operationId: getStoriesByStatus
 *     security:
 *       - BearerAuth: []   # use the security scheme named 'BearerAuth'
 *     parameters:
 *       - in: query
 *         name: status
 *         description: The status of the stories to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         description: The search term to filter stories.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 *       '400':
 *         description: Invalid status value
 *       '401':
 *         description: User is not authenticated
 *       '500':
 *         description: An error occurred while trying to get the stories
 * components:
 *   schemas:
 *     Story:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         containsProfanity:
 *           type: boolean
 *         profaneWords:
 *           type: array
 *           items:
 *             type: string
 *         profanityDetails:
 *           type: object
 *           properties:
 *             inName:
 *               type: array
 *               items:
 *                 type: string
 *             inChapters:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfaneChapter'
 *     ProfaneChapter:
 *       type: object
 *       properties:
 *         chapterNo:
 *           type: integer
 *         profaneWords:
 *           type: array
 *           items:
 *             type: string
 */
storyRouter.get(
  "/get_stories_by_status",
  authenticate,
  storyController.getStoriesByStatus
);

storyRouter.post(
  "/upload",
  authenticate,
  upload.single("image"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(404).send("please select img");
    }
    next();
  },
  storyController.uploadStoryImage,
  (error, req, res, next) => {
    console.error(error);
    res.status(500).send({ error: "Something went wrong." });
  }
);

storyRouter.patch(
  "/:id/status",
  authenticate,
  storyController.changeStoryStatus
);

 

export default storyRouter;
