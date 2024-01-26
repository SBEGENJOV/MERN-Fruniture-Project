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

//Tüm kuponları getirme
exports.getCoupons = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.find();
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ error: "Server hatası" });
  }
});

//Tek kupon getirme
exports.getCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  res.status(201).json({
    status: "Başarılı",
    message: "Kupon getirildi",
    coupon,
  });
});

//Kupon silme
exports.deleteCoupon = asyncHandler(async (req, res) => {
    const couponFound = await Coupon.findById(req.params.id);
    if (!couponFound) {
      throw new Error("Kupon bulunamadı");
    }
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "Başarılı",
      message: "Kupon silindi",
    });
  });
