const asyncHandler = require("express-async-handler");
const Contact = require("../model/Contact");
const User = require("../model/user");

//İletişim mesajlarını getirme
exports.getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({});
  res.status(201).json({
    status: "Başarılı",
    message: "Mesajlar listelendi",
    contact,
  });
});

//Mesaj oluşturma
exports.createContact = asyncHandler(async (req, res) => {
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  //* Create contact
  const contact = await Contact.create(req.body);
  //send the response
  res.json({
    status: "Başarılı",
    message: "Mesaj başarı ile oluşturuldu",
    contact,
  });
});

//mesaj silme
exports.deleteContact = asyncHandler(async (req, res) => {
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("Kullanıcı bulunamadı");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "Başarılı",
    message: "Mesaj silindi",
  });
});
