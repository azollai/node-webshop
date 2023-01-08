const BasketItem = require("../models/BasketItem");

exports.getAll = async (req, res, next) => {
  const results = await BasketItem.find().populate({
    path: "product",
    select: "name",
  });
  return res.status(200).json(results);
};

exports.create = async (req, res, next) => {
  try {
    req.body.product = req.params.productId;
    console.log("product", req.query);
    const result = await BasketItem.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
