import { User } from "../models/index.js";
import { generateToken } from "../config/auth.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import Exception from "../exceptions/exception.js";

const register = async ({ name, email, password, role }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Exception("Email already is use");
    }
    const verificationToken = crypto.randomBytes(20).toString("hex");
    const user = new User({ name, email, password, verificationToken, role });
    return await user.save();
  } catch (error) {
    throw new Exception(error.message);
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword({ password }))) {
      throw Error("Invalid email or password");
    }

    if (!user.isVerified) {
      throw Error("Please verify your email before logging in");
    }

    const token = generateToken(user);
    return { token: token, userId: user._id };
  } catch (error) {
    throw Error(error.message);
  }
};

export default {
  register,
  login,
};
