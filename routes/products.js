import express from "express";
import { productsController } from "../controllers/index.js";

const router = express.Router();

//create product
router.post("/", productsController.createProduct);
//get all product
router.get("/", productsController.getProductList);
//get product by id
router.get("/:id", productsController.getProductById);
//update product
router.put("/:id", productsController.updateProduct);
// delete product by id
router.delete("/:id", productsController.deleteProduct);

export default router;
