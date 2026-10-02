import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getFoodLogs, 
  addFoodLog, 
  getExerciseLogs, 
  addExerciseLog 
} from '../controllers/healthController.js';

const router = express.Router();

router.route('/food').get(protect, getFoodLogs).post(protect, addFoodLog);
router.route('/exercise').get(protect, getExerciseLogs).post(protect, addExerciseLog);

export default router;