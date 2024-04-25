import Categories from "../../models/Categories.js";

const updateCategoryStatus = async (id) => {
  try {
    const category = await Categories.findById(id);
    category.status = category.status === "Active" ? "Inactive" : "Active";
    await category.save();
    return category;
  } catch (error) {
    throw new Error("Failed to update category status");
  }
};

export default updateCategoryStatus;
