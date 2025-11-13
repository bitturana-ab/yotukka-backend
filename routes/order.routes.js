import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  cancelOrder,
  getOrdersByUserId,
} from "../controllers/order.controller.js";

const orderrouter = Router();

// Admin: Get all orders
orderrouter.get("/", adminMiddleware, getAllOrders);

// User: Get orders by user ID
orderrouter.get("/user/:id", authMiddleware, getOrdersByUserId);

// User: Get order by ID
orderrouter.get("/:id", authMiddleware, getOrderById);

// User: Create order
orderrouter.post("/", authMiddleware, createOrder);

// Admin: Update order (status, etc.)
orderrouter.put("/:id", adminMiddleware, updateOrder);

// ancel order for admin only for now later for user will be there
orderrouter.delete("/:id", adminMiddleware, cancelOrder);

export default orderrouter;
