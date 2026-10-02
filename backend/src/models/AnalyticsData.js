
import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, // e.g., Month, Category, or Label
  value: { type: Number, required: true }, // Metric value for charts
  secondaryValue: { type: Number }         // Optional comparative metric
}, { timestamps: true });

export default mongoose.model('AnalyticsData', analyticsSchema);