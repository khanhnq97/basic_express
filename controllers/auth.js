import { authRepository } from "../repositories/index.js";
import emailUitl from "../ utils/email.js";
import User from "../models/user.js";

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await authRepository.register({
      name,
      email,
      password,
      role,
    });

    await emailUitl.sendVerificationEmail(email, newUser.verificationToken);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ messgae: "Invalid verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, userId } = await authRepository.login({ email, password });
    res.status(200).json({ token, userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  register,
  login,
  verifyEmail,
};
