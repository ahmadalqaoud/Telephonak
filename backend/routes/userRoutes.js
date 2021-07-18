import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUserById,
	updateAdminRole,
	updateUserRole,
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
router.route('/userRole/:id').put(protect, admin, updateAdminRole);
router.route('/adminRole/:id').put(protect, admin, updateUserRole);
export default router;
