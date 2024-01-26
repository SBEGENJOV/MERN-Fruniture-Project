const asyncHandler = require("express-async-handler");
const Coupon = require("../model/Coupon");
const User = require("../model/User");

//yeni kupon oluşturma
exports.createCoupon = asyncHandler(async (req, res) => {
  //!Kullanıcıyı arama ve hesap kontrolu
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  const { code, discountPercent, counts } = req.body;
  //kupon kontollu
  const couponFound = await Coupon.findOne({ code });
  if (couponFound) {
    throw new Error("Kupon zaten var");
  }
  //Create kupon
  const coupon = await Coupon.create({
    code,
    discountPercent,
    counts,
  });
  //Sonuçları bildirme
  res.json({
    status: "Başarılı",
    message: "Kupon yüklendi",
    product,
  });
});
