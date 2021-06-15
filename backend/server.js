import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'

connectDB()
dotenv.config()
const app = express()
app.get('/', (req, res) => {
	res.json({
		name: 'abdallah',
		lastName: 'sabbagh',
	})
})

app.get('/api/products', (req, res) => {
	res.json(products)
})
app.get('/api/products/:id', (req, res) => {
	const product = products.find((pro) => pro._id === req.params.id)
	res.json(product)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(
		`server running in ${process.env.NODE_ENV} on Port ${process.env.PORT}`
			.yellow.underline.bold,
	)
})
