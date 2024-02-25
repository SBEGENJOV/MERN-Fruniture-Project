const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const ProductType = require("../model/ProductType");

//yeni tür oluşturma
exports.createProductType = asyncHandler(async (req, res) => {
  const { name, categoryID } = req.body;
  //! if exist
  const productTypeFound = await ProductType.findOne({ name });
  if (productTypeFound) {
    throw new Error("Bu tür zaten var");
  }
  const productType = await ProductType.create({
    name: name,
    category: categoryID,
    img: req?.file?.path,
  });
  //Ürün türü  güncelleme
  await Category.findByIdAndUpdate(
    categoryID,
    {
      $push: { productTypes: productType._id },
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "Başarılı",
    message: "Tür başary ile oluşturuldu",
    productType,
  });
});

//Tüm türleri getirme
exports.getProductTypes = asyncHandler(async (req, res) => {
  const productType = await ProductType.find({}).populate({
    path: "products",
    model: "Product",
  });
  res.status(201).json({
    status: "Başarılı",
    message: "Türler listelendi",
    productType,
  });
});
//Tekli tür getirme
exports.getProductTypesOne = asyncHandler(async (req, res) => {
  const productType = await ProductType.findById(req.params.id).populate({
    path: "products",
    model: "Product",
  });
  res.status(201).json({
    status: "Başarılı",
    message: "Türler listelendi",
    productType,
  });
});

//Türleri silme
exports.deleteProductType = asyncHandler(async (req, res) => {
  await ProductType.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "Başarılı",
    message: "Tür silindi",
  });
});

//Tür güncelleme
exports.updateProductType = asyncHandler(async (req, res) => {
  //Eşleştirme
  const { id } = req.params;
  const productTypeFound = await ProductType.findById(id);
  if (!productTypeFound) {
    throw new Error("Tür yok");
  }
  const productType = await ProductType.findByIdAndUpdate(
    id,
    {
      name: req.body.name ? req.body.name : productTypeFound?.name,
      img: req?.file?.path ? req?.file?.path : productTypeFound?.img,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "Başarılı",
    message: "Tür güncellendi",
    productType,
  });
});
