const asyncHandler = require("express-async-handler");
const expressAsyncHandler = require("express-async-handler");
const User = require("../model/User");
const Campains = require("../model/Campains");

//Kampanya oluşturma
exports.createCampains = expressAsyncHandler(async (req, res) => {
  //!Kullanıcıyı arama ve hesap kontrolu
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  const { title, desc } = req.body;
  //Post kontollu
  const campainsFound = await Campains.findOne({ title });
  if (campainsFound) {
    throw new Error("Kampanya zaten var");
  }

  //Create post
  const campains = await Campains.create({
    title,
    desc,
    img: req?.file?.path,
  });
  //Sonuçları bildirme
  res.json({
    status: "Başarılı",
    message: "Kampanya yüklendi",
    campains,
  });
});

//Kampanya getirme
exports.getCampains = asyncHandler(async (req, res) => {
  try {
    const campains = await Campains.find();
    res.status(200).json(campains);
  } catch (error) {
    res.status(500).json({ error: "Server hatası" });
  }
});

//Tekli Kampanya alma
exports.getCampain = asyncHandler(async (req, res) => {
  const campains = await Campains.findById(req.params.id);
  res.status(201).json({
    status: "Başarılı",
    message: "Kampanya getirildi",
    campains,
  });
});

//Blog silme
exports.deleteCampain = asyncHandler(async (req, res) => {
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  const campainsFound = await Campains.findById(req.params.id);
  if (!campainsFound) {
    throw new Error("Kampanya bulunamadı");
  }
  await Campains.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "Başarılı",
    message: "Kampanya silindi",
  });
});

//Blog güncelleme
exports.updateCampains = asyncHandler(async (req, res) => {
  //eşleştirme
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  const { id } = req.params;
  const campainsFound = await Campains.findById(id);
  if (!campainsFound) {
    throw new Error("Kampanya yok");
  }
  //resim yolunu belirtme
  const { title, desc } = req.body;
  const campain = await Campains.findByIdAndUpdate(
    id,
    {
      title: title ? title : campainsFound?.title,
      desc: desc ? desc : campainsFound?.desc,
      img: req?.file?.path ? req?.file?.path : campainsFound?.img,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "Başarılı",
    message: "Kampanya güncellendi",
    campain,
  });
});
