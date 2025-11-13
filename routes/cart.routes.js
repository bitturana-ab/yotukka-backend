import { Router } from "express";
import * as cart from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const cartrouter = Router();

// Get user cart
cartrouter.get("/", authMiddleware, cart.getCart);

// Add product to cart
cartrouter.post("/add", authMiddleware, cart.addToCart);

// Remove product from cart
cartrouter.delete("/:id", authMiddleware, cart.removeFromCart);

// Update product quantity in cart
cartrouter.put("/:id", authMiddleware, cart.updateCart);

// Checkout cart (create order)
cartrouter.post("/checkout", authMiddleware, cart.checkout);

export default cartrouter;
