import User from "../../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ phoneNumber, password }) => {
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("Invalid phone number or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid phone number or password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default login;
