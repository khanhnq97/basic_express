import express from "express";
import mongoose from "mongoose";
import {
  productsRoute,
  authRoute,
  cookieRoute,
  sessionRoute,
} from "./routes/index.js";
import { authenticateToken } from "./middleware/auth.js";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = 3000;
const URI =
  "mongodb+srv://studynodejs:Abc123456@cluster0.dg8lj.mongodb.net/basic_express?retryWrites=true&w=majority&appName=Cluster0";

// Cấu hình middleware session
app.use(errorHandler);
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Đặt true nếu sử dụng HTTPS
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(authenticateToken);

app.use("/products", productsRoute);
app.use("/auth", authRoute);
app.use("/cookie", cookieRoute);
app.use("/session", sessionRoute);

const connectMongoDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected success");
  } catch (error) {
    console.log("Connected failure");
  }
};

app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`Server is listening on port: ${PORT}`);
});
