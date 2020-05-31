const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  reg_num: {
    type: String,
    required: true,
    unique: true
  },
  available: {
    type: Boolean,
    required: true
  },
  stationed_at: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "station",
    required: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle_type",
    required: true
  }
});

vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = vehicle;
