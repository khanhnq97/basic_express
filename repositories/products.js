import { Product } from "../models/index.js";
import AppError from "../ utils/AppError.js";

const createProduct = async ({ name, quantity, price }) => {
  try {
    const paramProduct = {
      name: name,
      quantity: quantity,
      price: price,
    };
    return await Product.create(paramProduct);
  } catch (error) {
    throw Error(error);
  }
};

const getProductList = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw Error(error);
  }
};

const getProductById = async ({ id }) => {
  try {
    const product = await Product.findById({ id });
    if (!product) {
      return new AppError("Product not found", 404);
    }
    return product;
  } catch (error) {
    console.log("repo error:", error);
    return new AppError(error.message, error.statusCode);
  }
};

const updateProduct = async ({ id, name, quantity, price }) => {
  try {
    const newProduct = {
      name: name,
      quantity: quantity,
      price: price,
    };
    const product = await Product.findByIdAndUpdate(id, newProduct);
    if (!product) {
      throw Error("Product not found");
    }
    const updatedProduct = await Product.findById(id);
    return updatedProduct;
  } catch (error) {
    throw Error(error);
  }
};

const deleteProduct = async ({ id }) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw Error("Product not found");
    }
  } catch (error) {
    throw Error(error);
  }
};

export default {
  createProduct,
  getProductList,
  getProductById,
  updateProduct,
  deleteProduct,
};
