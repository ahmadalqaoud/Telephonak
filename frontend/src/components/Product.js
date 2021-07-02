import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
	return (
		<Card className='my-3 mb-2 ' style={{ height: '95%' }}>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>
			<Card.Header className='text-center ' style={{ height: '25%' }} as='div'>
				<Link className='text-dark' to={`/product/${product._id}`}>
					{product.name}
				</Link>
			</Card.Header>
			<Card.Body>
				<Card.Text as='h6'>
					<div className='my-3 text-center'>
						<Rating
							rating={product.rating}
							text={`${product.numReviews} reviews`}
						/>
					</div>
				</Card.Text>
			</Card.Body>
			<Card.Footer as='h3' className='text-center'>
				${product.price}
			</Card.Footer>
		</Card>
	);
};

export default Product;
