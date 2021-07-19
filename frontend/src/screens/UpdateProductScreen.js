import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_CREATE_RESET } from '../redux/constants/productsConstants';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../redux/actions/productsActions';
import { Form, Button, Container } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
const UpdateProductScreen = ({ match, history }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { product, loading, error } = useSelector(
		(state) => state.productDetails,
	);
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const id = match.params.id;
	useEffect(() => {
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
		dispatch({ type: PRODUCT_CREATE_RESET });
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
	]);
	return (
		<LoadErrHandler
			loading={loading}
			error={error ? 'Ops! something went wrong' : ''}
		>
			<Container className='flex p-4 w-75'>
				<h1>Edit Product</h1>
				<Form>
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
						<Form.File id='image-file' custom className='mt-2'></Form.File>
					</Form.Group>
					<hr />
					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Container>
		</LoadErrHandler>
	);
};

export default UpdateProductScreen;
