const express = require("express");
const isLoggin = require("../middlewares/isLoggin");
const {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} = require("../controllers/comment");
const commentRouter = express.Router();


//Yorum Route
commentRouter.post("/", createComment);
commentRouter.get("/", getComments);
commentRouter.delete("/:id", isLoggin, deleteComment);
commentRouter.put("/:id", isLoggin, updateComment);

module.exports = commentRouter;
