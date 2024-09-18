import { productsRepository } from "../repositories/index.js";
import mongoose from "mongoose";

const createProduct = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const product = await productsRepository.createProduct({
      name,
      quantity,
      price,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductList = async (req, res) => {
  try {
    const products = await productsRepository.getProductList();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsRepository.getProductById({ id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, name, quantity, price } = req.params;
    const product = await productsRepository.updateProduct({
      id,
      name,
      quantity,
      price,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productsRepository.deleteProduct({ id });
    res.status(200).json({ message: `Delete success item product: ${id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createProduct,
  getProductList,
  getProductById,
  updateProduct,
  deleteProduct,
};
