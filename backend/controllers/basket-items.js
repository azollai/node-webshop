const BasketItem = require("../models/BasketItem");

exports.getAll = async (req, res, next) => {
  const results = await BasketItem.find().populate({
    path: "product",
    select: "name price",
  });
  return res.status(200).json(results);
};

exports.create = async (req, res, next) => {
  try {
    req.body.product = req.params.productId;
    const result = await BasketItem.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.remove = async (req, res, next) => {
  const result = await BasketItem.findById(req.params.basketItemId);
  console.log("RES", result, req.params.basketItemId);

  await result.remove();
  res.status(200).json(result);
};
