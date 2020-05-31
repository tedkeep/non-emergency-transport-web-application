const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = equipment = mongoose.model("equipment", equipmentSchema);
