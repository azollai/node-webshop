const Product = require("../models/Product");

exports.getAll = async (req, res, next) => {
  const results = await Product.find().populate({
    path: "basketItems",
    select: "quantity",
  });
  return res.status(200).json(results);
};

exports.create = async (req, res, next) => {
  try {
    const result = await Product.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
