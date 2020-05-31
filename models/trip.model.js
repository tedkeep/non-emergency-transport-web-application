const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  reason: { type: String, required: true },
  to_address: {
    type: String,
    required: true
  },
  from_address: {
    type: String,
    required: true
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  time_to: { type: String, required: true },
  return: { type: Boolean, required: true },
  return_time: { type: String },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true
  },
  estimated_journey_time: {
    text: { type: String, required: true },
    value: { type: Number, required: true }
  },
  equipment: [
    {
      equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "equipment",
        required: true
      }
    }
  ],
  requirements: [
    {
      requirement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "travel_requirement",
        required: true
      }
    }
  ],
  notes: { type: String }
});

module.exports = trip = mongoose.model("trip", tripSchema);
