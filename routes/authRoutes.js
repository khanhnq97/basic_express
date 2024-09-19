import express from "express";
import { User } from "../models/index.js";
import { generateToken } from "../config/auth.js";
import emailUitl from "../ utils/email.js";
import crypto from "crypto";

const router = express.Router();

// Đăng ký
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const user = new User({ name, email, password, verificationToken });
    await user.save();

    //todo: implement latter
    //await emailUitl.sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message:
        "User registered. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xác thực email
router.get("/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //todo: implement latter
    // if (!user.isVerified) {
    //   return res
    //     .status(400)
    //     .json({ message: "Please verify your email before logging in" });
    // }

    const token = generateToken(user);
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Quên mật khẩu
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await emailUitl.sendPasswordResetEmail(email, resetToken);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Đặt lại mật khẩu
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
