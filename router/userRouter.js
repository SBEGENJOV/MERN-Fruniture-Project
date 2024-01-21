const multer = require("multer");
const express = require("express");
const { register } = require("../controllers/User");

//*Kütüphaneyi kullana bilmek için değişkene atadım.
const usersRouter = express.Router();


usersRouter.post("/register", register);

//*Kullana bilmek için eksport ediyorum
module.exports = usersRouter;