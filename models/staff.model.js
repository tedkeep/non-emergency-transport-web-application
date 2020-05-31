const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  staff_number: {
    type: Number,
    required: true
  },
  shifts: [
    {
      start_time: {
        type: String,
        required: true
      },
      finish_time: {
        type: String,
        required: true
      },
      day: {
        type: String,
        required: true
      }
    }
  ],
  unavailable: [
    {
      date: {
        type: Date,
        required: true
      },
      note: {
        type: String
      }
    }
  ],
  skills: [
    {
      skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skill",
        required: true
      }
    }
  ],
  stationed_at: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "station",
    required: true
  },
  available: {
    required: true,
    type: Boolean
  }
});

module.exports = personnel = mongoose.model("personnel", staffSchema);
