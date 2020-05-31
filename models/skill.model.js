const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = skill = mongoose.model("skill", skillSchema);
