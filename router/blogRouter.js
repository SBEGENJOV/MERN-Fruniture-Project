const express = require("express");
const isLoggin = require("../middlewares/isLoggin");
const {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogs");
const blogRouter = express.Router();

blogRouter.post("/", isLoggin, createBlog);
blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.delete("/:id", isLoggin, deleteBlog);
blogRouter.put("/:id", isLoggin, updateBlog);

module.exports = blogRouter;
