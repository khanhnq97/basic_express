import express from "express";
const router = express.Router();

// Route để đặt session
router.get("/set-session", (req, res) => {
  req.session.username = "john_doe";
  res.send("Session đã được đặt");
});

// Route để đọc session
router.get("/get-session", (req, res) => {
  const username = req.session.username;
  if (username) {
    res.send(`Xin chào, ${username}!`);
  } else {
    res.send("Không tìm thấy session username");
  }
});

// Route để xóa session
router.get("/clear-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Lỗi khi xóa session");
    }
    res.send("Session đã được xóa");
  });
});

export default router;
