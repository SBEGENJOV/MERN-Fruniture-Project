const asyncHandler = require("express-async-handler");
const expressAsyncHandler = require("express-async-handler");
const User = require("../model/User");
const Blog = require("../model/Blog");

//Blog oluşturma
exports.createBlog = expressAsyncHandler(async (req, res) => {
  //!Kullanıcıyı arama ve hesap kontrolu
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  const { title, desc, writer } = req.body;
  //Post kontollu
  const blogFound = await Post.findOne({ title });
  if (blogFound) {
    throw new Error("Blog zaten var");
  }

  //Create post
  const blog = await Blog.create({
    title,
    desc,
    writer,
    img: req?.file?.path,
  });
  //Sonuçları bildirme
  res.json({
    status: "Başarılı",
    message: "Blog yüklendi",
    blog,
  });
});

//Blog getirme
exports.getBlogs = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Server hatası" });
  }
});

//Tekli Blog alma
exports.getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.status(201).json({
    status: "Başarılı",
    message: "Blog getirildi",
    blog,
  });
});

//Blog silme
exports.deleteBlog = asyncHandler(async (req, res) => {
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  const blogFound = await Blog.findById(req.params.id);
  if (!blogFound) {
    throw new Error("Blog bulunamadı");
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "Başarılı",
    message: "Blog silindi",
  });
});

//Blog güncelleme
exports.updateBlog = asyncHandler(async (req, res) => {
  //eşleştirme
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  const { id } = req.params;
  const blogFound = await Blog.findById(id);
  if (!blogFound) {
    throw new Error("Blog yok");
  }
  //resim yolunu belirtme
  const { title, desc, writer } = req.body;
  const blog = await Blog.findByIdAndUpdate(
    id,
    {
      title: title ? title : blogFound?.title,
      desc: desc ? desc : blogFound?.desc,
      writer: writer ? writer : blogFound?.writer,
      img: req?.file?.path ? req?.file?.path : productFound?.img,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "Başarılı",
    message: "Blog güncellendi",
    blog,
  });
});
