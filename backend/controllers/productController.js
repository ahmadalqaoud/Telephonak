import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @des     Fetch all products
//@route    GET '/api/products'
//@access   Public
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	if (products) {
		res.json(products);
	} else {
		throw new Error('products not Found');
	}
});

// @des     Fetch single product by id
//@route    GET '/api/products/:id'
//@access   Public
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('product not Found');
	}
});

// @des     Delete single product by Id
//@route    delete '/api/products/:id'
//@access   private
export const deleteProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: 'product has been removed' });
	} else {
		res.status(404);
		throw new Error('product not Found');
	}
});

// @des     create product
//@route    post '/api/products'
//@access   private
export const createProduct = asyncHandler(async (req, res) => {
	const product = await Product.create({
		name: 'sample name',
		image: '/images/sample.jpg',
		brand: 'sample brand',
		category: 'sample category',
		description: 'sample description',
		user: req.user._id,
	});
	const createdProduct = await product.save();
	res.status(201);
	res.json(createdProduct);
});

// @des     update product
//@route    put '/api/products/:id'
//@access   private
export const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, brand, category, description, countInStock, image } =
		req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		product.name = name;
		product.price = price;
		product.brand = brand;
		product.category = category;
		product.description = description;
		product.countInStock = countInStock;
		product.image = image;
		const updatedProduct = await product.save();
		res.status(201);
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('product not Found');
	}
});
