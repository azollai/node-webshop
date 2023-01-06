const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  return res.status(200).json(products);
};

exports.createProducts = async (req, res, next) => {
  try {
    const products = await Product.create(req.body);
    res.status(201).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
