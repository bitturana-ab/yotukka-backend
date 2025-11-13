import Cart from "../models/cart.model.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity, user } = req.body;

    if (!productId || !quantity || !user)
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });

    let cart = await Cart.findOne({ user });
    if (!cart) cart = await Cart.create({ user, products: [] });

    const existing = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existing) existing.quantity += quantity;
    else cart.products.push({ product: productId, quantity });

    await cart.save();
    res.status(201).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== req.params.id
    );
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Product removed", data: cart });
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart?.products.find(
      (p) => p.product.toString() === req.params.id
    );
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    item.quantity = Math.max(1, quantity);
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Cart updated", data: cart });
  } catch (error) {
    next(error);
  }
};

export const checkout = async (req, res, next) => {
  try {
    await Cart.deleteOne({ user: req.user.id });
    res.status(200).json({ success: true, message: "Checkout successful" });
  } catch (error) {
    next(error);
  }
};
