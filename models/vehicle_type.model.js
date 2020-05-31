const mongoose = require("mongoose");

const vehicleTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  crew_size: {
    type: Number,
    required: true
  }
});

vehicleType = mongoose.model("vehicle_type", vehicleTypeSchema);

module.exports = vehicleType;
