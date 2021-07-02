import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, ListGroup, Card, Image } from 'react-bootstrap';
import Rating from '../components/Rating';
import LoadErrHandler from '../components/LoadErrHandler';
//redux
import { getProductDetails } from '../redux/actions/productsActions';
import { useSelector, useDispatch } from 'react-redux';
const ProductScreen = ({ match, history }) => {
	const dispatch = useDispatch();
	const [Qty, setQty] = useState(1);
	const { product, loading, error } = useSelector(
		(state) => state.productDetails,
	);
	const addToCart = () => {
		history.push(`/cart/${match.params.id}?qty=${Qty}`);
	};
	useEffect(() => {
		dispatch(getProductDetails(match.params.id));
	}, [match.params.id, dispatch]);
	return (
		<>
			<LoadErrHandler
				loading={loading}
				error={error ? `OOPS! something went wrong` : false}
			>
				{product && (
					<>
						<Link className='my-3 btn btn-dark' to='/'>
							GO BACK
						</Link>
						<Row>
							<Col lg={6} md={6}>
								<Image src={product.image} alt={product.name} fluid />
							</Col>
							<Col lg={3} md={6}>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<h4>{product?.name?.toUpperCase()}</h4>
									</ListGroup.Item>
									<ListGroup.Item>
										<Rating
											rating={product.rating}
											text={`${product.numReviews} reviews`}
										/>
									</ListGroup.Item>
									<ListGroup.Item>
										<h3>PRICE : ${product.price}</h3>
									</ListGroup.Item>
									<ListGroup.Item>
										<h5>DESCRIPTION :</h5>
										<p>{product.description}</p>
									</ListGroup.Item>
								</ListGroup>
							</Col>
							<Col className='my-4'>
								<Card>
									<ListGroup variant='flush'>
										<ListGroup.Item>
											<Row>
												<Col>PRICE :</Col>
												<Col>{product.price}</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col> STATUS :</Col>
												<Col>
													{product.countInStock > 0
														? 'In stock'
														: 'Out of stock'}
												</Col>
											</Row>
										</ListGroup.Item>
										{product.countInStock > 0 && (
											<ListGroup.Item
												as='select'
												value={Qty}
												onChange={(e) => setQty(e.target.value)}
											>
												{[...Array(product.countInStock).keys()].map((x) => {
													return (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													);
												})}
											</ListGroup.Item>
										)}
										<ListGroup.Item>
											<Button
												className='btn btn-block btn-dark'
												type='button'
												style={{ width: '100%' }}
												disabled={product.countInStock <= 0}
												onClick={() => addToCart()}
											>
												ADD TO CART
											</Button>
										</ListGroup.Item>
									</ListGroup>
								</Card>
							</Col>
						</Row>
					</>
				)}
			</LoadErrHandler>
		</>
	);
};

export default ProductScreen;
