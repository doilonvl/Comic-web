import Categories from "../../models/Categories.js";

const getAllCategoriesAdmin = async () => {
  try {
    const categories = await Categories.find();
    return categories;
  } catch (error) {
    throw new Error("Failed to get categories");
  }
};

export default getAllCategoriesAdmin;
