const express = require("express");
const isLoggin = require("../middlewares/isLoggin");
const multer = require("multer");
const storage = require("../utils/fileUpload");
const upload = multer({ storage });
const {
  getCampain,
  getCampains,
  createCampains,
  deleteCampain,
  updateCampains,
} = require("../controllers/campains");
const campainRouter = express.Router();

campainRouter.post("/", isLoggin, upload.single("file"), createCampains);
campainRouter.get("/", getCampains);
campainRouter.get("/:id", getCampain);
campainRouter.delete("/:id", isLoggin, deleteCampain);
campainRouter.put("/:id", isLoggin, upload.single("file"), updateCampains);

module.exports = campainRouter;
