import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import { sendMail } from "../utils/mail.js";
import { orderTemplate, orderStatusTemplate } from "../utils/emailTemplates.js";

// Get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// Get order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user products.product"
    );
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Create new order
export const createOrder = async (req, res, next) => {
  try {
    const { user, products, totalAmount, status, shippingAddress, username } =
      req.body;

    const order = await Order.create({
      user,
      products,
      totalAmount,
      status,
      shippingAddress,
      username,
    });

    const userDoc = await User.findById(user);
    if (userDoc)
      sendMail(
        userDoc.email,
        `Order Confirmation #${order._id}`,
        orderTemplate(username, order._id, products, totalAmount)
      );

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Update order status
export const updateOrder = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    const userDoc = await User.findById(order.user);
    if (userDoc)
      sendMail(
        userDoc.email,
        `Order #${order._id} Status Updated`,
        orderStatusTemplate(order.username, order._id, status)
      );

    res
      .status(200)
      .json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    next(error);
  }
};

// Delete (cancel) order
export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, message: "Order cancelled" });
  } catch (error) {
    next(error);
  }
};

// Get all orders for a user
export const getOrdersByUserId = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.params.id }).populate(
      "products.product"
    );
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};
