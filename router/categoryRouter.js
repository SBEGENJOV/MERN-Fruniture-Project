const express = require("express");
const isLoggin = require("../middlewares/isLoggin");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const categoryRouter = express.Router();


//Category route
categoryRouter.post("/", isLoggin, createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.delete("/:id", isLoggin, deleteCategory);
categoryRouter.put("/:id", isLoggin, updateCategory);

module.exports = categoryRouter;
