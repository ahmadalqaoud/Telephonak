//@TODO : COMPLETE PAYPAL PAYMENT AFTER 25th JUN
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderById } from '../redux/actions/orderActions';
import LoadErrHandler from '../components/LoadErrHandler';
import { Container, ListGroup, Row, Col, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { updateOrderToPaid } from '../redux/actions/orderActions';
import { ORDER_PAY_RESET } from '../redux/constants/orderConstants';

const OrderScreen = ({ match }) => {
	const { success, order, loading } = useSelector(
		(state) => state.orderDetails,
	);
	const { success: orderPaySuccess, loading: loadingOrderPay } = useSelector(
		(state) => state.orderPay,
	);
	const [sdkReady, setSdkReady] = useState(false);
	const dispatch = useDispatch();
	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(updateOrderToPaid(match.params.id, paymentResult));
	};
	useEffect(() => {
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/PayPal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		if (!order || orderPaySuccess) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderById(match.params.id));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, match.params.id, orderPaySuccess, order]);

	return (
		<LoadErrHandler
			loading={loading}
			error={!success ? 'something went wrong' : ''}
		>
			{order && (
				<Container>
					<Row>
						<Col lg={6} md={0} sm={0}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2>Shipping</h2>
									<strong>Name : {order.user.name}</strong>
									<br />
									<strong>Email : {order.user.email}</strong>
									<br />
									<p>
										<strong>Address:</strong>
										{order?.shippingAddress?.address},{' '}
										{order?.shippingAddress?.city}{' '}
										{order?.shippingAddress?.postalCode},{' '}
										{order?.shippingAddress?.country}
									</p>
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Payment Method</h2>
									<strong>Method: </strong>
									{order.paymentMethod}
								</ListGroup.Item>
								<ListGroup.Item>
									<h2>Order Items</h2>
									<ListGroup variant='flush'>
										{order?.orderItems?.map((item, index) => (
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
						</Col>
						<Col lg={6} md={0} sm={0}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<h2>Order Summary</h2>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Shipping</Col>
											<Col>${order.shippingPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Tax</Col>
											<Col>${order.taxPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Total</Col>
											<Col>${order.totalPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Paid</Col>
											<Col>
												{order.isPaid ? (
													<small>
														ORDER IS PAID{` `}
														<i className='fas fa-check-circle' />
													</small>
												) : (
													<small>ORDER ISN'T PAID YET</small>
												)}
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Delivered</Col>
											<Col>
												{order.isDelivered ? (
													<small>
														ORDER IS DELIVERED at PUT DELEVERY DATE !!!!! {` `}
														<i className='fas fa-check-circle' />
													</small>
												) : (
													<small>ORDER ISN'T DELIVERED YET</small>
												)}
											</Col>
										</Row>
									</ListGroup.Item>
									{!order.isPaid && (
										<>
											{loadingOrderPay && (
												<>
													<small>loading...</small>
												</>
											)}
											<PayPalButton
												amount={order.totalPrice}
												onSuccess={successPaymentHandler}
											/>
										</>
									)}
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</Container>
			)}
		</LoadErrHandler>
	);
};

export default OrderScreen;
