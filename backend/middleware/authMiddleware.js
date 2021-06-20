import JWT from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
dotenv.config();
export const protect = asyncHandler(async (req, res, next) => {
	let token = req.header('authorization');
	if (!token) {
		res.status(401);
		throw new Error('not authorized');
	}
	if (token && token.startsWith('Bearer')) {
		try {
			const decoded = JWT.verify(token.split(' ')[1], process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select('-password');
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('not authorized,token failed');
		}
	}
	next();
});
