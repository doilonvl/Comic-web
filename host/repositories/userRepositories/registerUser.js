import User from "../../models/Users.js";
import bcrypt from "bcrypt";

const register = async ({ userName, email, phoneNumber, password, img }) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      throw new Error("User with this email or phone number already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
      img,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default register;
