import { User } from "../models/index.js";
import { generateToken } from "../config/auth.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

const register = async ({ name, email, password, role }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already is use");
    }
    const verificationToken = crypto.randomBytes(20).toString("hex");
    const user = new User({ name, email, password, verificationToken, role });
    return await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    console.log(`password: ${password} - email:${email}`);
    //todo: need udpate latter
    // if (!user || !(await user.comparePassword({ password }))) {
    //   return res.status(400).json({ message: "Invalid email or password" });
    // }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!user || !isMatchPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    return { token: token, userId: user._id };
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  register,
  login,
};
