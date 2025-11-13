import { Router } from "express";
import adminauthorization from "../middlewares/admin.middleware.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getProductByName,
  getProductByPrice,
} from "../controllers/product.controller.js";

const productroutes = Router();

// Public Routes
productroutes.get("/", getProducts);
productroutes.get("/name/:name", getProductByName);
productroutes.get("/price/:price", getProductByPrice);
productroutes.get("/category/:category", getProductByCategory);
productroutes.get("/:id", getProduct);

// Admin Routes
productroutes.post("/", adminauthorization, createProduct);
productroutes.put("/:id", adminauthorization, updateProduct);
productroutes.delete("/:id", adminauthorization, deleteProduct);

export default productroutes;
