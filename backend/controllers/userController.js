import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

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
				token: null,
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
