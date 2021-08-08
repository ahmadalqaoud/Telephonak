import React, { useEffect } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
const CartScreen = ({ match, location, history }) => {
	const { cartItems } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const productID = match.params.id ? match.params.id : '';
	const qty = location.search ? parseInt(location.search.split('=')[1]) : '';
	useEffect(() => {
		if (productID && qty) {
			dispatch(addToCart(productID, qty));
		}
	}, [dispatch, qty, productID]);

	return (
		<LoadErrHandler
			error={cartItems.length <= 0 && 'Your cart is empty'}
			variant='secondary'
		>
			<>
				<h5>SHOPPING CART</h5>
				<Row>
					<Col lg={4} md={12} sm={12}>
						<CheckoutForm cartItems={cartItems} />
					</Col>
					<hr className='hide-lg' />
					<Col className='my-3 scrollable-div' lg={8} md={12} sm={12}>
						<ListGroup variant='flush'>
							{cartItems.length > 0 &&
								cartItems.map((item) => (
									<CartItem key={item.product} item={item} />
								))}
						</ListGroup>
					</Col>
				</Row>
			</>
		</LoadErrHandler>
	);
};

export default CartScreen;
