import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUserById,
	updateRole,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import express from 'express';
const router = express.Router();
router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
//admin routes
router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUserById);
router.route('/role/:id').put(protect, admin, updateRole);
export default router;
