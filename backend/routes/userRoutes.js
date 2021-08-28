import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import express from 'express';
const router = express.Router();
router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
export default router;
