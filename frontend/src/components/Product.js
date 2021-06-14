import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
	return (
		<Card className='my-3 ' style={{ height: '100%' }}>
			<a href={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</a>
			<Card.Header className='text-center ' style={{ height: '25%' }} as='div'>
				{product.name}
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
	)
}

export default Product
