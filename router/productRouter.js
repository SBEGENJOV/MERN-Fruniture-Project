const express = require("express");
const multer = require("multer");
const upload = multer({ storage });
const storage = require("../../utils/fileUpload");
const isLoggin = require("../middlewares/isLoggin");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");
const productRouter = express.Router();

productRouter.post("/", isLoggin, upload.single("file"), createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.delete("/:id", isLoggin, deleteProduct);
productRouter.put("/:id", isLoggin, upload.single("file"), updateProduct);

module.exports = productRouter;
