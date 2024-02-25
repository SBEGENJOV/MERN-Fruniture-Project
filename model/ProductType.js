const mongoose = require("mongoose");

const ProductTypeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductType = mongoose.model("ProductType", ProductTypeSchema);
module.exports = ProductType;
