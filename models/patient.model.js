const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  nhs_number: {
    unique: true,
    type: Number
  },
  address: {
    street: { type: String, required: true },
    town: { type: String, required: true },
    county: { type: String },
    postcode: { type: String, required: true }
  }
});
patient = mongoose.model("patient", patientSchema);

patient.createIndexes({
  unique: true,
  partialFilterExpression: { nhs_number: { $type: "string" } }
});

module.exports = patient = mongoose.model("patient", patientSchema);
