import express from "express";
import storyCategoriesController from "../../controllers/storyCategoriesController/index.js";
import StoryCategories from "../../models/StoryCategory.js";

const storyCategoriesRouter = express.Router();

storyCategoriesRouter.get(
  "/all_story_catergories/:sid",
  storyCategoriesController.getStoryCategories
);

storyCategoriesRouter.route('/getCategoriesBystoryId/:id').get(async (req, res, next) => {
  try {
    const storyId = req.params.id
    const response = await StoryCategories.find({ storyId })
      .populate({
        path: 'categoryId',
        options: { sort: { 'name': 1, 'createdAt': -1 } }
      })
    res.send(response)
  } catch (error) {
    next(error)
  }
})

export default storyCategoriesRouter;
