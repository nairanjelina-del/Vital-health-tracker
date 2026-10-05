import FoodLog from '../models/FoodLog.js';
import ExerciseLog from '../models/ExerciseLog.js';
import WaterLog from '../models/WaterLog.js';
import WeightLog from '../models/WeightLog.js';

const toNum = (v) => (v === '' || v === undefined || v === null ? undefined : Number(v));

// ---------- Water ----------
export const getWaterLogs = async (req, res) => {
  try {
    const logs = await WaterLog.find({ user: req.user._id }).sort({ date: -1, createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addWaterLog = async (req, res) => {
  try {
    const amountMl = toNum(req.body.amountMl);
    if (!amountMl) {
      return res.status(400).json({ message: 'amountMl is required' });
    }
    const log = await WaterLog.create({
      user: req.user._id,
      amountMl,
      date: req.body.date || undefined
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWaterLog = async (req, res) => {
  try {
    const log = await WaterLog.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Food ----------
export const getFoodLogs = async (req, res) => {
  try {
    const logs = await FoodLog.find({ user: req.user._id }).sort({ date: -1, createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFoodLog = async (req, res) => {
  try {
    const { meal, foodItem, date } = req.body;
    const calories = toNum(req.body.calories);

    if (!foodItem || calories === undefined) {
      return res.status(400).json({ message: 'foodItem and calories are required' });
    }

    const log = await FoodLog.create({
      user: req.user._id,
      meal,
      foodItem,
      calories,
      protein: toNum(req.body.protein),
      carbs: toNum(req.body.carbs),
      fat: toNum(req.body.fat),
      date: date || undefined
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFoodLog = async (req, res) => {
  try {
    const log = await FoodLog.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Exercise ----------
export const getExerciseLogs = async (req, res) => {
  try {
    const logs = await ExerciseLog.find({ user: req.user._id }).sort({ date: -1, createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addExerciseLog = async (req, res) => {
  try {
    const { exerciseName, date } = req.body;
    const durationMinutes = toNum(req.body.durationMinutes);
    const caloriesBurned = toNum(req.body.caloriesBurned);

    if (!exerciseName || durationMinutes === undefined || caloriesBurned === undefined) {
      return res.status(400).json({
        message: 'exerciseName, durationMinutes and caloriesBurned are required'
      });
    }

    const log = await ExerciseLog.create({
      user: req.user._id,
      exerciseName,
      durationMinutes,
      caloriesBurned,
      date: date || undefined
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExerciseLog = async (req, res) => {
  try {
    const log = await ExerciseLog.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Weight ----------
export const getWeightLogs = async (req, res) => {
  try {
    const logs = await WeightLog.find({ user: req.user._id }).sort({ date: 1, createdAt: 1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addWeightLog = async (req, res) => {
  try {
    const weight = toNum(req.body.weight);
    if (!weight) {
      return res.status(400).json({ message: 'weight is required' });
    }
    const log = await WeightLog.create({
      user: req.user._id,
      weight,
      date: req.body.date || undefined
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};