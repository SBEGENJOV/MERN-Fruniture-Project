const asyncHandler = require("express-async-handler");
const User = require("../model/user");
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
exports.getProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Server hatası" });
  }
});

// Tüm ürünleri categoriye göre getirme
exports.getProductsCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Kategorinin ID'sine göre ürünleri bul
    const products = await Product.find({ productType: categoryId });
    res.status(200).json(products);
    console.log(products);
  } catch (error) {
    res.status(500).json({ error: "Server hatası" });
  }
});

//Tekli ürün atma
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate({
      path: "productType",
      populate: {
        path: "category",
      },
    })
    .populate({
      path: "comments",
      populate: {
        path: "author", // Yorumlardaki kullanıcıları da populate et
      },
    });

  res.status(201).json({
    status: "Başarılı",
    message: "Ürün getirildi",
    product,
  });
});

//Ürün silme
exports.deleteProduct = asyncHandler(async (req, res) => {
  const productFound = await Product.findById(req.params.id);
  if (!productFound) {
    throw new Error("Ürün bulunamadı");
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "Başarılı",
    message: "Ürün silindi",
  });
});

//Ürün güncelleme
exports.updateProduct = asyncHandler(async (req, res) => {
  //eşleştirme
  const { id } = req.params;
  const productFound = await Product.findById(id);
  if (!productFound) {
    throw new Error("Ürün yok");
  }
  //resim yolunu belirtme
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
  const product = await Product.findByIdAndUpdate(
    id,
    {
      img: req?.file?.path ? req?.file?.path : productFound?.img,
      name: name ? name : productFound?.name,
      colors: colors ? colors : productFound?.colors,
      description: description ? description : productFound?.description,
      stokCode: stokCode ? stokCode : productFound?.stokCode,
      price: price ? price : productFound?.price,
      warranty: warranty ? warranty : productFound?.warranty,
      stokCount: stokCount ? stokCount : productFound?.stokCount,
      productType: productTypeID ? productTypeID : productFound?.productType,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "Başarılı",
    message: "Ürün güncellendi",
    product,
  });
});
