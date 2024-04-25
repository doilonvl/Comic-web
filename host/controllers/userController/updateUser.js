import { userDAO } from "../../repositories/index.js";
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userDAO.updateUser(
      req.body.phoneNumber,
      req.body
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default updateUser;
