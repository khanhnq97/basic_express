import { verifyToken } from "../config/auth.js";

const needAuthToken = (url) => {
  if (
    url === "/auth/login".trim().toLowerCase() ||
    url === "/auth/register".trim().toLowerCase() ||
    url.includes("verify")
  ) {
    return false;
  }
  return true;
};

export const authenticateToken = (req, res, next) => {
  const url = req?.url?.trim()?.toLowerCase();

  console.log(`url: ${url}`);

  if (!needAuthToken(url)) {
    return next();
  }

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
