import express from "express";
const router = express.Router();

// Route để đặt cookie
router.get("/set-cookie", async (req, res) => {
  res.cookie("username", "john_doe", {
    maxAge: 60000,
    httpOnly: true,
  });
  res.send("Cookkie đã được set");
});

// Route để đọc cookie
router.get("/get-cookie", (req, res) => {
  // Đọc giá trị của cookie 'username'
  const username = req.cookies.username;
  if (username) {
    res.send(`Xin chào, ${username}!`);
  } else {
    res.send("Không tìm thấy cookie username");
  }
});

// Route để xóa cookie
router.get("/clear-cookie", (req, res) => {
  // Xóa cookie 'username'
  res.clearCookie("username");
  res.send("Cookie đã được xóa");
});

export default router;
