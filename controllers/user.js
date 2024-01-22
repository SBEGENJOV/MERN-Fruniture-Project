const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../model/user");

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
