const mongoose = require("mongoose");

const travelRequirementSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = travelRequirement = mongoose.model(
  "travel_requirement",
  travelRequirementSchema
);
