import React, { useEffect } from 'react';
import { getAdminOrders } from '../redux/actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadErrHandler from '../components/LoadErrHandler';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ORDER_DELIVERED_RESET } from '../redux/constants/orderConstants';
const OrdersScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { loading, error, orders } = useSelector(
		(state) => state.ordersDetails,
	);
	const { userInfo } = useSelector((state) => state.userLogin);
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch({ type: ORDER_DELIVERED_RESET });
			dispatch(getAdminOrders());
		} else {
			history.push('/');
		}
	}, [dispatch, history, userInfo]);
	return (
		<LoadErrHandler
			loading={loading}
			error={error ? 'Ops! something went wrong' : ''}
		>
			<Row className='align-items-center'>
				<Col>
					<h1>orders</h1>
				</Col>
			</Row>
			{orders?.length > 0 ? (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>CUSTOMER</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>PAYMENT METHOD</th>
							<th>TOTAL PRICE</th>
							<th>TAX PRICE</th>
							<th>SHIPPING PRICE</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user.name}</td>
								<td>{order.isPaid ? 'YES' : 'NO'}</td>
								<td>{order.isDelivered ? 'YES' : 'NO'}</td>
								<td>{order.paymentMethod}</td>
								<td>{order.totalPrice}</td>
								<td>{order.taxPrice}</td>
								<td>{order.shippingPrice}</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant='light' className='btn-sm'>
											DETAILS
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<h5>There are no orders</h5>
			)}
		</LoadErrHandler>
	);
};

export default OrdersScreen;
