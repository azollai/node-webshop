const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name cannot be longer than 50 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please add price"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.virtual("basketItems", {
  ref: "BasketItem",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

module.exports = mongoose.model("Product", schema);
