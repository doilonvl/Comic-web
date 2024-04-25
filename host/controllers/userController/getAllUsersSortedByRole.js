import { userDAO } from "../../repositories/index.js";

const getAllUsersSortedByRole = async (req, res) => {
  try {
    const users = await userDAO.getAllUsersSortedByRole();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getAllUsersSortedByRole;
