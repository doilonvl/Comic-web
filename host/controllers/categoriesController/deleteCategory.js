import categoryRepositories from "../../repositories/categoryRepositories/index.js";
import createError from 'http-errors';

const deleteCategory = async (req, res, next) => {
  try {
    await categoryRepositories.deleteCategory(req.params.id);
    res.send({ message: "Category deleted" });
  } catch (error) {
    next(createError(500, 'Failed to delete category'));
  }
};

export default deleteCategory;