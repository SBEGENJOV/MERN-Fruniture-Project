const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Product = require("../model/Product");

//Kullanıcı kayıt olma işlemi

exports.register = asyncHandler(async (req, res) => {
  //Kayıt işlemi
  const { username, email, password } = req.body;
  //Kullanıcı kontrolu
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("Kullanıcı zaten kayıtlı");
  }
  //Kayıt yapılma aşaması
  const newUser = new User({
    username,
    email,
    password,
  });
  //Şifreyi güvenliye dönüştürme
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  //Kayıt
  await newUser.save();
  res
    .status(200)
    .json({ status: "OK", message: "Kullanıcı kayıt işlemi tamam", newUser });
});

//Kullanıcı login işlemleri
exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // Kullanıcı kontrolu
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Kullanıcı bulunamadı");
  }
  const isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new Error("Giriş bilgileri doğru değil");
  }
  // Son giriş zamanını güncelleme için veritabanında bir güncelleme işlemi gerçekleştirilmeli
  user.lastLogin = new Date();
  res.json({
    status: "success",
    email: user?.email,
    _id: user?._id,
    username: user?.username,
    role: user?.role,
  });
});

//Kullanıcı bilgilerini getirme
exports.getProfile = asyncHandler(async (req, res, next) => {
  //İlk populate fonksiyonu, "productViewrs" adlı bir alanı doldurur. Bu alanın değerleri, Product modeliyle ilişkilidir. Yani, User modelindeki productViewrs alanındaki her öğe, ilgili Product modeli ile ilişkilendirilen verilerle doldurulur. path parametresi, doldurulacak alanın adını belirtirken, model parametresi ise ilişkilendirilen modelin adını belirtir.
  const user = await User.findById(id)
    .populate({
      path: "productViewrs",
      model: "Product",
    })
    .populate({
      path: "likedProduct",
      model: "Product",
    });
  res.json({
    status: "succes",
    message: "Profile girildi",
    user,
  });
});

//Bakılan ürünü bakılanlara ekleme
exports.productViewers = asyncHandler(async (req, res) => {
  //* Find that we want to view his profile
  const productId = req.params.productId;

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Böyle bir ürün yok");
  }
  //Kendi bilgilerini bulmak
  const currentUserId = req.userAuth._id;
  const currentUser = await User.findById(currentUserId);
  //? Check if user already viewed the profile
  if (currentUser?.productViewrs?.includes(productId)) {
    throw new Error("Zaten bakmışsın");
  }
  //push the user current user id into the user profile
  currentUser.productViewrs.push(productId);
  await currentUser.save();
  res.json({
    message: "Ürün bakılanlar listesine eklendi",
    status: "Başarılı",
  });
});

//Ürün begenme
exports.likeProduct = expressAsyncHandler(async (req, res) => {
  //Product id sini alma
  const { id } = req.params;
  //Kullanıcının giriş yaptıgı id yi bulma
  const userId = req.userAuth._id;
  //Postu bulma
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Ürün yok");
  }
  const user = await User.findById(userId);
  const userlikedProduct = user.likedProduct.filter(
    (like) => like.toString() === id.toString()
  );
  if (userlikedProduct.length > 0) {
    throw new Error("Ürün zaten eklenmiş");
  }
  //Begenenlere ekleme
  await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { likedProduct: id },
    },
    { new: true }
  );
  //Sonuçu kaydet
  await post.save();
  res.status(200).json({ message: "Post begenilenlere eklendi.", post });
});

//Ürünü begenilenlerden çıkarma
exports.dislikedProduct = expressAsyncHandler(async (req, res) => {
  // Product id sini alma
  const { id } = req.params;
  // Kullanıcının giriş yaptığı id'yi bulma
  const userId = req.userAuth._id;
  // Ürünü bulma
  const product = await Product.findById(id);
  
  if (!product) {
    throw new Error("Ürün yok");
  }

  // Kullanıcıyı bulma
  const user = await User.findById(userId);
  user.likedProduct = user.likedProduct.filter(
    (like) => like.toString() !== id.toString()
  );
  
  // Kullanıcının değişiklikleri kaydetme
  await user.save();
  
  res.status(200).json({ message: "Ürün beğenilenlerden çıkarıldı.", user });
});

//Kullanıcı bilgilerini değiştirme
exports.updateUserProfile = asyncHandler(async (req, res) => {
  //!Kullanıcı kontorlu
  const userId = req.userAuth?._id;
  const userFound = await User.findById(userId);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  //! Kullanıcı email ve adı degiştirme işlemi
  const { username, email } = req.body;
  const post = await User.findByIdAndUpdate(
    userId,
    {
      email: email ? email : userFound?.email,
      username: username ? username : userFound?.username,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "Başarılı",
    message: "Kullanıcı başarı ile güncellendi",
    post,
  });
});

