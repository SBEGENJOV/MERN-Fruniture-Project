const mongoose = require("mongoose");

const ProductTypeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductType = mongoose.model("Category", ProductTypeSchema);
module.exports = ProductType;
