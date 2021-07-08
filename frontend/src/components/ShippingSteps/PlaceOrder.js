import React from 'react';
import {
	Container,
	Col,
	Image,
	Row,
	Button,
	Card,
	ListGroup,
	Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../redux/actions/orderActions';
import LoadErrHandler from '../LoadErrHandler';

const PlaceOrder = ({ setCurrentComponentIndex }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { loading, error, success } = useSelector((state) => state.orderCreate);
	//   Calculate prices
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
	);
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.ShippingAddress,
				paymentMethod: cart.PaymentMethod,
				itemsPrice: cart.itemsPrice,
				taxPrice: cart.taxPrice,
				shippingPrice: cart.shippingPrice,
				totalPrice: cart.totalPrice,
			}),
		);
		if (success) {
			setCurrentComponentIndex((prev) => prev + 1);
		}
	};

	return (
		<>
			<LoadErrHandler loading={loading ? true : false}>
				{error && (
					<Alert className='full-width' variant='danger'>
						{error}
					</Alert>
				)}

				<Col lg={6} md={12} sm={12}>
					<Container>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Shipping</h2>
								<p>
									<strong>Address:</strong>
									{cart?.ShippingAddress?.address},{' '}
									{cart?.ShippingAddress?.city}{' '}
									{cart?.ShippingAddress?.postalCode},{' '}
									{cart?.ShippingAddress?.country}
								</p>
							</ListGroup.Item>

							<ListGroup.Item>
								<h2>Payment Method</h2>
								<strong>Method: </strong>
								{cart.PaymentMethod}
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Order Items</h2>
								<ListGroup variant='flush'>
									{cart?.cartItems?.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = $
													{(item.qty * item.price).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							</ListGroup.Item>
						</ListGroup>
					</Container>
				</Col>
				<Col lg={6} md={0} sm={0}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<div className='py-3'>
									<Row>
										<Col
											lg={8}
											md={8}
											sm={12}
											className='justify-content-between d-flex w-100'
										>
											<Button
												variant='dark'
												type='button'
												className='flex-end'
												onClick={() =>
													setCurrentComponentIndex((prev) => prev - 1)
												}
											>
												Back
											</Button>
											<Button
												variant='dark'
												type='button'
												className='flex-start '
												onClick={() => {
													placeOrderHandler();
												}}
											>
												place order
											</Button>
										</Col>
									</Row>
								</div>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</LoadErrHandler>
		</>
	);
};

export default PlaceOrder;
