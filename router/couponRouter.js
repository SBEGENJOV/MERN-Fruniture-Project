const express = require("express");
const isLoggin = require("../middlewares/isLoggin");
const {
  createCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon,
  updateCoupon,
  singleCoupon,
} = require("../controllers/coupon");
const couponRouter = express.Router();

couponRouter.post("/", isLoggin, createCoupon);
couponRouter.get("/", getCoupons);
couponRouter.get("/:id", getCoupon);
couponRouter.delete("/:id", isLoggin, deleteCoupon);
couponRouter.put("/:id", isLoggin, updateCoupon);
couponRouter.put("/single/:singleid", singleCoupon);

module.exports = couponRouter;
