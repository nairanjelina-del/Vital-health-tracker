import mongoose from 'mongoose';

const foodLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodItem: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number },
  carbs: { type: Number },
  fat: { type: Number },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('FoodLog', foodLogSchema);