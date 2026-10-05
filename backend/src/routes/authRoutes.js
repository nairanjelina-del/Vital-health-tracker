import express from "express";
import { protect } from '../middleware/authMiddleware.js';
import { 
  registerUser, 
  authUser, 
  getUserProfile, 
  updateUserProfile 
} from '../controllers/authController.js'


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser); // Maps to authUser controller
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
export default router;