const BasketItem = require("../models/BasketItem");

exports.getAll = async (req, res, next) => {
  const results = await BasketItem.find().populate({
    path: "product",
    select: "name price",
  });
  return res.status(200).json(results);
};

exports.add = async (req, res, next) => {
  try {
    req.body.product = req.params.productId;

    let result;
    if (req.params.basketItemId) {
      const basketItem = await BasketItem.findById(req.params.basketItemId);
      result = await BasketItem.findByIdAndUpdate(basketItem.id, {
        quantity: basketItem.quantity + 1,
      });
    } else {
      result = await BasketItem.create({ ...req.body, quantity: 1 });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.subtract = async (req, res, next) => {
  try {
    const basketItem = await BasketItem.findById(req.params.basketItemId);

    let result;
    if (basketItem.quantity === 1) {
      return this.remove(req, res, next);
    } else {
      result = await BasketItem.findByIdAndUpdate(basketItem.id, {
        quantity: basketItem.quantity - 1,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.remove = async (req, res, next) => {
  const result = await BasketItem.findById(req.params.basketItemId);

  await result.remove();
  res.status(200).json(result);
};
