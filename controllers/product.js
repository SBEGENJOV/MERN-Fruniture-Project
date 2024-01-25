const asyncHandler = require("express-async-handler");
const expressAsyncHandler = require("express-async-handler");
const User = require("../model/User");
const Product = require("../model/Product");
const ProductType = require("../model/ProductType");

//Yeni bir ürün oluşturma(Create)
exports.createProduct = asyncHandler(async (req, res) => {
  //!Kullanıcıyı arama ve hesap kontrolu
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  const {
    name,
    colors,
    description,
    stokCode,
    price,
    warranty,
    stokCount,
    productTypeID,
  } = req.body;
  //Post kontollu
  const postFound = await Product.findOne({ name });
  if (postFound) {
    throw new Error("Ürün zaten var");
  }

  //Create post
  const product = await Product.create({
    name,
    colors,
    description,
    stokCode,
    price,
    warranty,
    stokCount,
    productType: productTypeID,
    img: req?.file?.path,
  });
  //Ürün türü  güncelleme
  await ProductType.findByIdAndUpdate(
    productTypeID,
    {
      $push: { products: product._id },
    },
    {
      new: true,
    }
  );

  //Sonuçları bildirme
  res.json({
    status: "Başarılı",
    message: "Post yüklendi",
    product,
  });
});

// Tüm ürünleri getirme (Read- All)
exports.getProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Server hatası" });
  }
});
