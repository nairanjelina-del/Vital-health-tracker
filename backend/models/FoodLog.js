const mongoose = require('mongoose');

const foodLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mealType: { 
    type: String, 
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], 
    required: true 
  },
  foodName: { type: String, required: true, trim: true },
  calories: { type: Number, required: true, min: 0 },
  protein: { type: Number, required: true, min: 0 }, // in grams
  carbs: { type: Number, required: true, min: 0 },   // in grams
  fat: { type: Number, required: true, min: 0 },       // in grams
  date: { type: Date, default: Date.now }             // Used to filter "Today's Nutrition"
}, { timestamps: true });

module.exports = mongoose.model('FoodLog', foodLogSchema);