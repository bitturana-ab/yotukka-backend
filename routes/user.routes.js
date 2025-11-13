import { Router } from "express";
import * as users from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const userrouter = Router();

// Admin: Get all users
userrouter.get("/", adminMiddleware, users.getUsers);

// Authorized user: Get single user
userrouter.get("/:id", authMiddleware, users.getUser);

// Admin: Create user now it will be disable
userrouter.post("/", adminMiddleware, users.createUser);

// Authorized user: Update user
userrouter.put("/:id", authMiddleware, users.updateUser);

// Authorized user: Delete user
userrouter.delete("/:id", authMiddleware, users.deleteUser);

export default userrouter;
