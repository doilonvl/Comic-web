import userDAO from "../../repositories/userRepositories/index.js";

const getAllUsers = async (req, res) => {
    try {
        res.status(201).json(await userDAO.getAllUsers());
    } catch (error) {
        res.status(500).json({
            message: error.toString(),
        });
    }
};

export default getAllUsers

