import Categories from "../../models/Categories.js";

const getAllCategories = async (req, res) => {
  try {
    return await Categories.find({ status: "Active" }).exec();
  } catch (error) {
    throw new Error(error.message);
  }
};
export default getAllCategories;
