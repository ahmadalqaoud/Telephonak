import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
	PRODUCT_CREATE_RESET,
	PRODUCT_UPDATE_RESET,
} from '../redux/constants/productsConstants';
import { getProductDetails } from '../redux/actions/productsActions';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
import { updateProduct } from '../redux/actions/productsActions';
const UpdateProductScreen = ({ match, history }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { product, loading, error } = useSelector(
		(state) => state.productDetails,
	);
	const {
		success,
		loading: updateProductLoading,
		error: UpdateProductError,
	} = useSelector((state) => state.productUpdate);
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [upload, setUpload] = useState(false);
	const id = match.params.id;
	const updateProductHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct(id, {
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			}),
		);
	};
	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const formData = new FormData();
		formData.append('image', file);
		console.log(formData);
		setUpload(true);
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			const { data } = await axios.post('/api/uploads', formData, config);
			setImage(data);
			setUpload(false);
		} catch (error) {
			console.log(error);
			setUpload(false);
		}
	};
	useEffect(() => {
		if (success) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admin/productsList');
		} else {
			dispatch({ type: PRODUCT_CREATE_RESET });
			if (userInfo && userInfo.isAdmin) {
				if (!product?.name || product?._id !== id) {
					dispatch(getProductDetails(id));
				} else {
					setName(product.name);
					setPrice(product.price);
					setBrand(product.brand);
					setCategory(product.category);
					setDescription(product.description);
					setImage(product.image);
				}
			} else {
				history.push('/');
			}
		}
	}, [
		dispatch,
		userInfo,
		userInfo.isAdmin,
		history,
		id,
		product?.name,
		product?._id,
		product?.price,
		product?.brand,
		product?.category,
		product?.description,
		product?.image,
		success,
	]);
	return (
		<LoadErrHandler
			loading={loading}
			error={error ? 'Ops! something went wrong' : ''}
		>
			<Container className='flex p-4 w-75'>
				{UpdateProductError && (
					<Alert variant='danger'>{UpdateProductError}</Alert>
				)}
				<h1>Edit Product</h1>
				<Form
					onSubmit={(e) => {
						updateProductHandler(e);
					}}
				>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							value={name}
							onChange={(e) => setName(e.target.value)}
							type='name'
							placeholder='Enter name'
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='price'>
						<Form.Label>Price</Form.Label>
						<Form.Control
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							type='number'
							placeholder='Enter price'
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='brand'>
						<Form.Label>Brand</Form.Label>
						<Form.Control
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
							type='text'
							placeholder='Enter brand'
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='countInStock'>
						<Form.Label>Count In Stock</Form.Label>
						<Form.Control
							value={countInStock}
							onChange={(e) => setCountInStock(e.target.value)}
							type='number'
							placeholder='Enter countInStock'
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='category'>
						<Form.Label>Category</Form.Label>
						<Form.Control
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							type='text'
							placeholder='Enter category'
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='description'>
						<Form.Label>Description</Form.Label>
						<Form.Control
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							type='text'
							placeholder='Enter description'
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='image'>
						<Form.Label>Image</Form.Label>
						<Form.Control
							value={image}
							onChange={(e) => setImage(e.target.value)}
							type='text'
							placeholder='Enter image url'
						></Form.Control>
						<Form.File
							onChange={uploadFileHandler}
							id='image-file'
							custom
							className='mt-2'
						>
							{upload && <small>loading ...</small>}
						</Form.File>
					</Form.Group>
					<hr />
					<Button type='submit' variant='primary'>
						{updateProductLoading ? (
							<small>loading...</small>
						) : (
							<small>update</small>
						)}
					</Button>
				</Form>
			</Container>
		</LoadErrHandler>
	);
};

export default UpdateProductScreen;
