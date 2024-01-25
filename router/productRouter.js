const express = require("express");
const multer = require("multer");
const upload = multer({ storage });
const storage = require("../../utils/fileUpload");
const isLoggin = require("../middlewares/isLoggin");
const { createProduct, getProducts } = require("../controllers/product");
const productRouter = express.Router();

productRouter.post("/", isLoggin, upload.single("file"), createProduct);
productRouter.get("/", getProducts);

module.exports = productRouter;
