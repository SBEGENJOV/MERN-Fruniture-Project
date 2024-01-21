const mongoose = require("mongoose");

const CampainsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Campains = mongoose.model("Blog", CampainsSchema);
module.exports = Campains;
