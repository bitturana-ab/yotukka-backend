import { Router } from "express";
import authorization from "../middlewares/auth.middleware.js";
import adminauthorization from "../middlewares/admin.middleware.js";
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
orderrouter.get("/", adminauthorization, getAllOrders);

// User: Get orders by user ID
orderrouter.get("/user/:id", authorization, getOrdersByUserId);

// User: Get order by ID
orderrouter.get("/:id", authorization, getOrderById);

// User: Create order
orderrouter.post("/", authorization, createOrder);

// Admin: Update order (status, etc.)
orderrouter.put("/:id", adminauthorization, updateOrder);

// User: Cancel order
orderrouter.delete("/:id", authorization, cancelOrder);

export default orderrouter;
