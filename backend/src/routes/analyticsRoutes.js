import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import AnalyticsData from '../models/AnalyticsData.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const data = await AnalyticsData.find({ user: req.user._id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { name, value, secondaryValue } = req.body;
    const newItem = await AnalyticsData.create({
      user: req.user._id,
      name,
      value,
      secondaryValue
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;