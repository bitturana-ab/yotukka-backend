import { Router } from "express";
import * as cart from "../controllers/cart.controller.js";
import authorization from "../middlewares/auth.middleware.js";

const cartrouter = Router();

// Get user cart
cartrouter.get("/", authorization, cart.getCart);

// Add product to cart
cartrouter.post("/add", authorization, cart.addToCart);

// Remove product from cart
cartrouter.delete("/:id", authorization, cart.removeFromCart);

// Update product quantity in cart
cartrouter.put("/:id", authorization, cart.updateCart);

// Checkout cart (create order)
cartrouter.post("/checkout", authorization, cart.checkout);

export default cartrouter;
