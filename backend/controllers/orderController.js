import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @des     Create new order
//@route    POST '/api/orders'
//@access   Private
export const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;
	if (orderItems && orderItems.length == 0) {
		res.status(400);
		throw new Error('no order items');
		return;
	} else {
		const order = new Order({
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			user: req.user._id,
		});
		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

// @des     GET ORDER BY ID
//@route    GET '/api/orders/:id'
//@access   Private

export const getOrderById = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const order = await Order.findById(id).populate('user', 'name email');
	if (!order) {
		res.status(404);
		throw new Error('no order found');
		return;
	}
	if (
		req.user._id.toString() === order.user._id.toString() ||
		req.user.isAdmin
	) {
		res.json(order);
	} else {
		res.status(401);
		throw new Error('user not authorized');
	}
});
// @des     GET ORDERS BY USER ID
//@route    GET '/api/orders'
//@access   Private
export const getAllOrdersByUserID = asyncHandler(async (req, res) => {
	const order = await Order.find({ user: req.user._id }).populate(
		'user',
		'name email',
	);
	if (!order) {
		res.status(404);
		throw new Error('no order found');
		return;
	}
	res.json(order);
});

// @des     Update order to paid
//@route    PUT '/api/orders/:id/pay'
//@access   Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('no order found');
		return;
	}
});

// @des    get all orders
//@route    GET '/api/orders/all'
//@access   Private
export const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name');
	if (orders) {
		res.json(orders);
	} else {
		res.status(404);
		throw new Error('no order found');
		return;
	}
});

// @des     Update order to paid
//@route    PUT '/api/orders/:id/deliver'
//@access   Private
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('no order found');
		return;
	}
});
