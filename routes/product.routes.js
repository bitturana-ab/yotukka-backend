import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
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
import { authMiddleware } from "../middlewares/auth.middleware.js";

const productroutes = Router();

// user routes
// get products will be public
productroutes.get("/", getProducts);
productroutes.get("/name/:name", getProductByName);
productroutes.get("/price/:price", getProductByPrice);
productroutes.get("/category/:category", getProductByCategory);
productroutes.get("/:id", getProduct);

// Admin Routes for managing products
productroutes.post("/", adminMiddleware, createProduct);
productroutes.put("/:id", adminMiddleware, updateProduct);
productroutes.delete("/:id", adminMiddleware, deleteProduct);

export default productroutes;
