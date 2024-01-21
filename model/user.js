const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    notificationPreferences: {
      email: { type: String, default: true },
      // diger bildirim türleri (sms)
    },
    genderUser: {
      type: String,
      enum: ["Kadın", "Erkek", "Belirtmek istemiyorum"],
    },
    productViewrs: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likedProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//! Generate Password Reset Token metotu oluşturma
userSchema.methods.generatePasswordResetToken = function () {
  //token oluşturma
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Kullanıcın şifresini sıfırlaması için token üretiyoruz belirlenen yere kaydediyoruz
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //Token geçerlilik süresini belirliyoruz
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
