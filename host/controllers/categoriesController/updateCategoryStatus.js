import categoryRepositories from "../../repositories/categoryRepositories/index.js";
import createError from "http-errors";

const updateCategoryStatus = async (req, res, next) => {
  try {
    const category = await categoryRepositories.updateCategoryStatus(req.params.id);
    res.send(category);
  } catch (error) {
    next(createError(500, "Failed to update category status"));
  }
};

export default updateCategoryStatus;
