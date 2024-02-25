const asyncHandler = require("express-async-handler");
const Comment = require("../model/Comment");
const Product = require("../model/Product");

//Yorumları getirme
exports.getComments = asyncHandler(async (req, res) => {
  const comment = await Comment.find({});
  res.status(201).json({
    status: "Başarılı",
    message: "Yorumlar listelendi",
    comment,
  });
});

//Yorum oluşturma
exports.createComment = asyncHandler(async (req, res) => {
  const { message ,productId} = req.body;
  //get post id from params
  //* Create comment
  const comment = await Comment.create({
    message,
    author: req.userAuth._id,
    productId,
  });
  //Associate comment to a post
  await Product.findByIdAndUpdate(
    productId,
    {
      $push: { comments: comment._id },
    },
    { new: true }
  );
  //send the response
  res.json({
    status: "Başarılı",
    message: "Yorum başarı ile oluşturuldu",
    comment,
  });
});
//Yorum silme
exports.deleteComment = asyncHandler(async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "Başarılı",
    message: "Yorum silindi",
  });
});

//Yorum güncelleme
exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      message: req.body.message,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "Başarılı",
    message: "Yorum güncellendi",
    comment,
  });
});
