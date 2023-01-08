const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 0,
    unique: true,
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
  },
});

module.exports = mongoose.model("BasketItem", schema);
