const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 0,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

module.exports = mongoose.model("BasketItem", schema);
