const multer = require("multer");
const express = require("express");
const { register,login } = require("../controllers/user");
const isLoggin = require("../middlewares/isLoggin");

//*Kütüphaneyi kullana bilmek için değişkene atadım.
const usersRouter = express.Router();


usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/profile/", isLoggin, getProfile);

//*Kullana bilmek için eksport ediyorum
module.exports = usersRouter;