const mongoose = require('mongoose');

const weightLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weight: { type: Number, required: true }, // in kg
  date: { type: Date, default: Date.now }  // Powers the progress line chart over time
}, { timestamps: true });

module.exports = mongoose.model('WeightLog', weightLogSchema);