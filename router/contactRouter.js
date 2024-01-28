const express = require("express");
const isLoggin = require("../middlewares/isLoggin");
const { getContacts, createContact, deleteContact } = require("../controllers/contact");
const contactRouter = express.Router();

contactRouter.post("/", createContact);
contactRouter.get("/", getContacts);
contactRouter.delete("/:id", isLoggin, deleteContact);

module.exports = contactRouter;