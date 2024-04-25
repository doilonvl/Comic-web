import categoryRepositories from "../../repositories/categoryRepositories/index.js";

const getAllCategories = async (req, res) => {
  try {
    res.status(200).json(await categoryRepositories.getAllCategories());
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export default getAllCategories;
