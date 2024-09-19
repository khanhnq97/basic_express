import { verifyToken } from "../config/auth.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const user = verifyToken(token);
    req.userId = user.id;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
