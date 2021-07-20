import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';

connectDB();
dotenv.config();
const app = express();
//to accept json
app.use(express.json());

//initial route!
app.get('/', (req, res) => {
	if (process.env.NODE_ENV !== 'production') {
		res.send('development monde!');
	} else {
		res.json({});
	}
});
//--------------- routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);

//make uploads folder static to gain access to it
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
//config PayPal
app.get('/api/config/PayPal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});
//-----errors middleware
app.use(notFound);
app.use(errorHandler);
//----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		`server running in ${process.env.NODE_ENV} on Port ${process.env.PORT}`
			.yellow.underline.bold,
	);
});
