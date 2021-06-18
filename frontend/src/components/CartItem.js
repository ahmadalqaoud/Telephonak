import React from 'react';
import { Row, Col, Image, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import Rating from './Rating';
const CarItem = ({ item }) => {
	const dispatch = useDispatch();
	const addItemOnChange = (productId, e) => {
		dispatch(addToCart(productId, parseInt(e.target.value)));
	};
	const removeFromCart = (productId) => {
		console.log(productId);
	};
	return (
		<ListGroup.Item key={item.product} className='scroll-item'>
			<Row>
				<Col lg={4} md={6} sm={6}>
					<Link className='text-dark' to={`/product/${item.product}`}>
						<Image src={item.image} alt={`${item.name} image`} fluid rounded />
					</Link>
				</Col>
				<Col lg={8} md={6} sm={6}>
					<Row>
						<Col md={12}>
							<h5>{item.name}</h5>
						</Col>
						<Col md={12}>
							<h6>PRICE: ${item.price}</h6>
						</Col>
						<Rating rating={item.rating} />

						<Col lg={4} md={12} sm={12} className='pt-4 pb-4'>
							<div>
								<ListGroup.Item
									as='select'
									value={item.qty}
									onChange={(e) => addItemOnChange(item.product, e)}
									className='width-70 full-width-sm'
								>
									{[...Array(item.countInStock).keys()].map((x) => (
										<option key={x + 1} value={x + 1}>
											{x + 1}
										</option>
									))}
								</ListGroup.Item>
							</div>
						</Col>
						<Col lg={4} md={12} sm={12} className='pt-4 pb-4'>
							<div>
								<Button
									type='button'
									variant='dark'
									onClick={() => removeFromCart(item.product)}
									className='full-width full-width-sm'
								>
									<small>REMOVE</small>
								</Button>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
		</ListGroup.Item>
	);
};

export default CarItem;
