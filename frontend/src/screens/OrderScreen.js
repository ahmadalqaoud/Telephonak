import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderById } from '../redux/actions/orderActions';
import LoadErrHandler from '../components/LoadErrHandler';
import { Container, ListGroup, Row, Col, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderScreen = ({ match }) => {
	const { success, order, loading } = useSelector(
		(state) => state.orderDetails,
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrderById(match.params.id));
	}, [dispatch, match.params.id]);

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
											<Col>Paid</Col>
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
