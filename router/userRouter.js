const multer = require("multer");
const express = require("express");
const {
  register,
  login,
  likeProduct,
  dislikedProduct,
  updateUserProfile,
  resetPassword,
  forgotpassword,
  getProfile,
  productViewers,
} = require("../controllers/user");
const isLoggin = require("../middlewares/isLoggin");
const storage = require("../utils/fileUpload");

//*Kütüphaneyi kullana bilmek için değişkene atadım.
const usersRouter = express.Router();
//!Dosya yükleme ara yazılımı
const upload = multer({ storage });

//User Routeleri
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/profile/:id", isLoggin, getProfile);
usersRouter.put("/likes/:id", isLoggin, likeProduct);
usersRouter.put("/dislikes/:id", isLoggin, dislikedProduct);
usersRouter.put("/update-profile/", isLoggin, updateUserProfile);
usersRouter.post("/forgot-password/", forgotpassword);
usersRouter.post("/reset-password/:resetToken/", resetPassword);
usersRouter.put("/product-view/:id", isLoggin, productViewers);

//*Kullana bilmek için eksport ediyorum
module.exports = usersRouter;
