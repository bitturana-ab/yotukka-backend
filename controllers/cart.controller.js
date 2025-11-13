import Cart from "../models/cart.model.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
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
    const { productId, quantity = 1 } = req.body;
    const user = req.user.id;

    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });

    let cart = await Cart.findOne({ user });
    if (!cart) cart = await Cart.create({ user, items: [] });

    const existing = cart.items.find((p) => p.product.toString() === productId);

    if (existing) existing.quantity += quantity;
    else cart.items.push({ product: productId, quantity });

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

    cart.items = cart.items.filter(
      (p) => p.product.toString() !== req.params.id
    );
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart?.items.find(
      (p) => p.product.toString() === req.params.id
    );
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });

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
