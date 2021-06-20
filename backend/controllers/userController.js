import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateAuthToken from '../utilities/generateToken.js';

//@des      Register a new user
//@route    POST '/api/users'
//@access   Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	//if user exist
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error('user already exist');
	}
	const user = await User.create({
		name,
		email,
		password,
	});
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateAuthToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

//@des      auth user & get token
//@route    POST '/api/users/login'
//@access   Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		const isAuthenticated = await bcrypt.compare(password, user.password);
		if (isAuthenticated) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateAuthToken(user._id),
			});
		} else {
			res.status(401);
			throw new Error('invalid email or password');
		}
	} else {
		res.status(401);
		throw new Error('invalid email or password');
	}
});

//@des      auth user & get token
//@route    GET '/api/users/profile'
//@access   PRIVATE
export const getUserProfile = asyncHandler(async (req, res) => {
	//coming from protected route
	const { user } = req;
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('Profile not found');
	}
});
