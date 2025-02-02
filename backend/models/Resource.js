const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  cpu: Number,
  ram: Number,
  disk: Number,
  network: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resource", ResourceSchema);
