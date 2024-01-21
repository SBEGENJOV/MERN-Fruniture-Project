const mongoose = require("mongoose");

//Scema
const CommentSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //ilişkili veri tabanı oluşturma şekli
  },
  { timestamps: true }
);
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    description: { type: String, required: true },
    comment: [CommentSchema],
    stokCode: [{ type: String, required: true }],
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
    shared: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
