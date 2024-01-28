const express = require("express");
const isLoggin = require("../middlewares/isLoggin");
const {
  getCampain,
  getCampains,
  createCampains,
  deleteCampain,
  updateCampains,
} = require("../controllers/campains");
const campainRouter = express.Router();

campainRouter.post("/", isLoggin, createCampains);
campainRouter.get("/", getCampains);
campainRouter.get("/:id", getCampain);
campainRouter.delete("/:id", isLoggin, deleteCampain);
campainRouter.put("/:id", isLoggin, updateCampains);

module.exports = campainRouter;
