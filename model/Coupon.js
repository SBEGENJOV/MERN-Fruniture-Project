const mongoose = require("mongoose");

const CouponSchema = mongoose.Schema(
  {
    code: { type: String, required: true }, // Kupon kodu
    discountPercent: { type: Number, required: true }, // İndirim oranı
    counts: { type: Number, required: true, default: 1 }, // Kupon sayısı
  },
  { timestamps: true }
);
const Coupon = mongoose.model("Coupon", CouponSchema);
module.exports = Coupon;
