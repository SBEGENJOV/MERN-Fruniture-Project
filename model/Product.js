const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    description: { type: String, required: true },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    stokCode: { type: String, required: true },
    price: {
      current: { type: Number, required: true },
      discount: { type: Number },
    },
    warranty: { type: Number, required: true },
    stokCount: { type: Number, required: true },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
