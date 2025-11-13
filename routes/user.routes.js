import { Router } from "express";
import * as users from "../controllers/user.controller.js";
import authorization from "../middlewares/auth.middleware.js";
import adminauthorization from "../middlewares/admin.middleware.js";

const userrouter = Router();

// Admin: Get all users
userrouter.get("/", adminauthorization, users.getUsers);

// Authorized user: Get single user
userrouter.get("/:id", authorization, users.getUser);

// Admin: Create user
userrouter.post("/", adminauthorization, users.createUser);

// Authorized user: Update user
userrouter.put("/:id", authorization, users.updateUser);

// Authorized user: Delete user
userrouter.delete("/:id", authorization, users.deleteUser);

export default userrouter;
