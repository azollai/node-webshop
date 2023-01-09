const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 1,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("BasketItem", schema);
