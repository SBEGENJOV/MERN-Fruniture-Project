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
    coupon,
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

//Kupon güncelleme
exports.updateCoupon = asyncHandler(async (req, res) => {
  //eşleştirme
  const { id } = req.params;
  const couponFound = await Coupon.findById(id);
  if (!couponFound) {
    throw new Error("Kupon yok");
  }
  //Verileri kullanıcıdan alma
  const { code, discountPercent, counts } = req.body;
  const coupon = await Coupon.findByIdAndUpdate(
    id,
    {
      code: code ? code : couponFound?.code,
      discountPercent: discountPercent
        ? discountPercent
        : couponFound?.discountPercent,
      counts: counts ? counts : couponFound?.counts,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "Başarılı",
    message: "Kupon güncellendi",
    coupon,
  });
});

//Kupon kullanma
exports.singleCoupon = asyncHandler(async (req, res) => {
  // Eşleştirme
  const { singleid } = req.params;
  const couponFound = await Coupon.findById(singleid);
  if (!couponFound) {
    throw new Error("Kupon yok");
  }

  // Verileri kullanıcıdan alma
  const counts = couponFound.counts; // Burada counts değerini alın
  const coupon = await Coupon.findByIdAndUpdate(singleid, {
    counts: counts < 1 ? "Kuponların hepsi kullanıldı" : counts - 1,
  });

  res.status(201).json({
    status: "Başarılı",
    message: "Kupon eksiltildi ve güncellendi",
    Coupon,
  });
});
