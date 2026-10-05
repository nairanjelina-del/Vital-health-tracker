const mongoose = require('mongoose');

const exerciseLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exerciseType: { type: String, required: true }, // e.g., 'Walking', 'Running', 'Cycling'
  duration: { type: Number, required: true, min: 0 },     // in minutes
  caloriesBurned: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now }             // Used to filter "Today's Exercise"
}, { timestamps: true });

module.exports = mongoose.model('ExerciseLog', exerciseLogSchema);