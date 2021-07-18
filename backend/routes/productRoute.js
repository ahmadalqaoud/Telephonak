import express from 'express';
import {
	getProducts,
	getProductById,
	deleteProductById,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/:id').delete(protect, admin, deleteProductById);
export default router;
