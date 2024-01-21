const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    mail: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
