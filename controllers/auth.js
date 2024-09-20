import { authRepository } from "../repositories/index.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await authRepository.register({ name, email, password });
    res.status(201).json(newUser);
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
};
