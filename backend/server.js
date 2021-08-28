import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

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
