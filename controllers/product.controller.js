import Product from "../models/product.model.js";

// Get all products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// Get single product
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Create new product
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Update product
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    Object.assign(product, req.body);
    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Product updated", data: product });
  } catch (error) {
    next(error);
  }
};

// Delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

// Get products by filters
export const getProductByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductByName = async (req, res, next) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductByPrice = async (req, res, next) => {
  try {
    const products = await Product.find({ price: { $lte: req.params.price } });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};
