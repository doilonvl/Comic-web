import { storyDAO } from "../../repositories/index.js";
import { cloudinary } from "../../utils/cloudinary.js";

const uploadStoryImage = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      public_id: `Story_${req.user.userName}_${Date.now()}`,
      folder: "Stories",
      transformation: [{ width: 200, height: 300, crop: "fill" }],
    });
    const imageUrl = result.secure_url;
    res.status(200).json(imageUrl);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default uploadStoryImage;