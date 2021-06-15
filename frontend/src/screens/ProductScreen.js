import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, ListGroup, Card, Image } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState('')
	useEffect(() => {
		const getProduct = async () => {
			const res = await axios.get(`/api/products/${match.params.id}`)
			setProduct(res.data)
		}
		return getProduct()
	}, [match.params.id])
	return (
		<>
			{product && (
				<>
					<Link className='btn btn-dark my-3' to='/'>
						GO BACK
					</Link>
					<Row>
						<Col lg={6} md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col lg={6} md={6}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h4>{product.name.toUpperCase()}</h4>
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
						<Col className='my-4' md={{ span: 6, offset: 3 }}>
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
												{product.countInStock > 0 ? 'Instock' : 'Out of stock'}
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Button
											className='btn btn-block btn-dark'
											type='button'
											style={{ width: '100%' }}
											disabled={product.countInStock <= 0}
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
		</>
	)
}

export default ProductScreen
