import express from 'express';
import {
	addOrderItems,
	getOrderById,
	getAllOrdersByUserID,
	updateOrderToPaid,
	getOrders,
	updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/all').get(protect, admin, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/').get(protect, getAllOrdersByUserID);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
