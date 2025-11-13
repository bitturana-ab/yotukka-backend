import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./db/mongodb.js";

// Routes
// import authRoutes from "./routes/auth.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import cartRoutes from "./routes/cart.routes.js";
// import orderRoutes from "./routes/order.routes.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Connect DB
connectDB();

// Routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/products", productRoutes);
// app.use("/api/v1/cart", cartRoutes);
// app.use("/api/v1/orders", orderRoutes);

app.get("/", (req, res) => res.send("API running"));

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
export default app;
