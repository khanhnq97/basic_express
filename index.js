import express from "express";
import mongoose from "mongoose";
import { productsRoute } from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const URI =
  "mongodb+srv://studynodejs:Abc123456@cluster0.dg8lj.mongodb.net/basic_express?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productsRoute);
app.use("/api/auth", authRoutes);

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
