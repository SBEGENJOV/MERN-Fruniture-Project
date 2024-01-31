const express = require("express");
const isLoggin = require("../middlewares/isLoggin");
const multer = require("multer");
const storage = require("../utils/fileUpload");
const upload = multer({ storage });
const {
  getProductTypes,
  deleteProductType,
  updateProductType,
  createProductType,
} = require("../controllers/producttype");
const productTypeRouter = express.Router();

//Ürün Tip i route
productTypeRouter.post("/", isLoggin, upload.single("file"), createProductType);
productTypeRouter.get("/", getProductTypes);
productTypeRouter.delete("/:id", isLoggin, deleteProductType);
productTypeRouter.put(
  "/:id",
  isLoggin,
  upload.single("file"),
  updateProductType
);

module.exports = productTypeRouter;
