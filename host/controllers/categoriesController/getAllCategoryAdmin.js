import categoryRepositories from "../../repositories/categoryRepositories/index.js";
import createError from "http-errors";

const getAllCategoriesAdmin = async (req, res, next) => {
  try {
    const categories = await categoryRepositories.getAllCategoriesAdmin();
    res.send(categories);
  } catch (error) {
    next(createError(500, "Failed to get categories"));
  }
};

export default getAllCategoriesAdmin;
