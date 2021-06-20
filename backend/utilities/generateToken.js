import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateAuthToken = (id) => {
	return JWT.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};
export default generateAuthToken;
