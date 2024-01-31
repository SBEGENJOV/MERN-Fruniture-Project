const express = require("express");
const isLoggin = require("../middlewares/isLoggin");
const multer = require("multer");
const storage = require("../utils/fileUpload");
const upload = multer({ storage });
const {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogs");
const blogRouter = express.Router();

//Blog route
blogRouter.post("/", isLoggin, upload.single("file"), createBlog);
blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.delete("/:id", isLoggin, deleteBlog);
blogRouter.put("/:id", isLoggin, upload.single("file"), updateBlog);

module.exports = blogRouter;
