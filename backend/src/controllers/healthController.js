import FoodLog from '../models/FoodLog.js';
import ExerciseLog from '../models/ExerciseLog.js';

// Food Logs
export const getFoodLogs = async (req, res) => {
  try {
    const logs = await FoodLog.find({ user: req.user._id }).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFoodLog = async (req, res) => {
  try {
    const { foodItem, calories, protein, carbs, fat } = req.body;
    const log = await FoodLog.create({
      user: req.user._id,
      foodItem,
      calories,
      protein,
      carbs,
      fat
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exercise Logs
export const getExerciseLogs = async (req, res) => {
  try {
    const logs = await ExerciseLog.find({ user: req.user._id }).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addExerciseLog = async (req, res) => {
  try {
    const { exerciseName, durationMinutes, caloriesBurned } = req.body;
    const log = await ExerciseLog.create({
      user: req.user._id,
      exerciseName,
      durationMinutes,
      caloriesBurned
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};