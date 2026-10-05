import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getFoodLogs, addFoodLog, deleteFoodLog,
  getExerciseLogs, addExerciseLog, deleteExerciseLog,
  getWaterLogs, addWaterLog, deleteWaterLog,
  getWeightLogs, addWeightLog
} from '../controllers/healthController.js';

const router = express.Router();

router.route('/water').get(protect, getWaterLogs).post(protect, addWaterLog);
router.route('/water/:id').delete(protect, deleteWaterLog);

router.route('/food').get(protect, getFoodLogs).post(protect, addFoodLog);
router.route('/food/:id').delete(protect, deleteFoodLog);

router.route('/exercise').get(protect, getExerciseLogs).post(protect, addExerciseLog);
router.route('/exercise/:id').delete(protect, deleteExerciseLog);

router.route('/weight').get(protect, getWeightLogs).post(protect, addWeightLog);

export default router;