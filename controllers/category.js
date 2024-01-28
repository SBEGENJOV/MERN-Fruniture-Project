const Category = require("../model/Category");
const asyncHandler = require("express-async-handler");

//yeni kategori oluşturma
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //! if exist
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error("Category zaten var");
  }
  const category = await Category.create({
    name: name
  });
  res.status(201).json({
    status: "Başarılı",
    message: "Category başary ile oluşturuldu",
    category,
  });
});

//Tüm kategorileri getirme
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate({
    path: "productTypes",
    model: "ProductType",
  });
  res.status(201).json({
    status: "Başarılı",
    message: "Categoriler listelendi",
    categories,
  });
});

//Kategori silme

exports.deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "Başarılı",
    message: "Category silindi",
  });
});

//Kategori güncelleme

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "Başarılı",
    message: "Categori güncellendi",
    category,
  });
});
