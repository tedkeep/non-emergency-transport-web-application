const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    street: { type: String, required: true },
    town: { type: String, required: true },
    county: { type: String },
    postcode: { type: String, required: true }
  }
});

module.exports = station = mongoose.model("station", stationSchema);
