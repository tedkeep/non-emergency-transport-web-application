const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    required: true
  },
  date: { type: String, required: true },
  staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "personnel",
      required: true
    }
  ],
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trip",
      required: true
    }
  ],
  start_time: { type: String, required: true },
  finish_time: { type: String, required: true }
});

module.exports = schedule = mongoose.model("schedule", scheduleSchema);
