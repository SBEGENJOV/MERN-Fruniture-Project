const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    productTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductType",
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
