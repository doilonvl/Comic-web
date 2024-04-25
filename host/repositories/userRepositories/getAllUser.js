import User from "../../models/Users.js";

const getAllUsers = async () => {
    try {
        return await User.find().exec()
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default getAllUsers
