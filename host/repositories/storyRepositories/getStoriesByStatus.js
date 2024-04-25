import Story from "../../models/Story.js";

const getStoriesByStatus = async (status, search = "") => {
  try {
    const isActive = status === "active";
    const query = { isActive };

    if (search) {
      query.name = { $regex: new RegExp(search, "i") };
    }

    const stories = await Story.find(query).populate("uploader");
    return stories;
  } catch (error) {
    throw error;
  }
};

export default getStoriesByStatus;
