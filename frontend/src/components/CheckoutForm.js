import React from 'react';
import { ListGroup, Col, Button } from 'react-bootstrap';
const CheckoutForm = ({ cartItems }) => {
	const checkoutHandler = () => {
		console.log('checkout');
	};
	return (
		<>
			<ListGroup>
				<ListGroup.Item as='h2' className=' text-dark'>
					TOTAL ITEMS : {` `}
					{cartItems.reduce((acc, current) => acc + current.qty, 0)}
				</ListGroup.Item>
				<ListGroup.Item as='h4' className=' text-dark'>
					TOTAL COST : $
					{cartItems
						.reduce((acc, current) => acc + current.qty * current.price, 0)
						.toFixed(2)}
				</ListGroup.Item>
				<ListGroup.Item as='div' className='text-center text-dark'>
					<Button
						variant='dark'
						className='full-width-sm full-width'
						disabled={cartItems.length <= 0}
						onClick={() => checkoutHandler()}
					>
						Proceed to checkout
					</Button>
				</ListGroup.Item>
			</ListGroup>
		</>
	);
};

export default CheckoutForm;
