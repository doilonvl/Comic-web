import express from "express";
import categoriesController from "../../controllers/categoriesController/index.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/all_catergories", categoriesController.getAllCategories);
categoriesRouter.post("/", categoriesController.createCategory);
categoriesRouter.delete("/:id", categoriesController.deleteCategory);
categoriesRouter.put("/:id/status", categoriesController.updateCategoryStatus);
categoriesRouter.get("/admin", categoriesController.getAllCategoriesAdmin);

export default categoriesRouter;
