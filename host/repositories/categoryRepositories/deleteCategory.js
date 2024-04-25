import Categories from "../../models/Categories.js";

const deleteCategory = async (id) => {
  try {
    await Categories.deleteOne({ _id: id });
  } catch (error) {
    throw new Error("Failed to delete category");
  }
};

export default deleteCategory;
