import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // Configure your email service here
  service: "gmail", // Sử dụng Gmail. Bạn có thể thay đổi thành dịch vụ email khác
  secure: false,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Kiểm tra kết nối
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// Hàm gửi email xác thực
const sendVerificationEmail = async (to, token) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: "Xác thực tài khoản email",
      html: `
        <h1>Xác thực tài khoản email của bạn</h1>
        <p>Vui lòng click vào link dưới đây để xác thực tài khoản email của bạn:</p>
        <a href="${process.env.BASE_URL}/verify/${token}">Xác thực email</a>
      `,
    };

    console.log(`to: ${to} - token: ${token}`);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
// Hàm gửi email đặt lại mật khẩu
const sendPasswordResetEmail = async (to, token) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: "Đặt lại mật khẩu",
      html: `
        <h1>Yêu cầu đặt lại mật khẩu</h1>
        <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng click vào link dưới đây để đặt lại mật khẩu của bạn:</p>
        <a href="${process.env.BASE_URL}/reset-password/${token}">Đặt lại mật khẩu</a>
        <p>Link này sẽ hết hạn sau 1 giờ.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
export default {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
