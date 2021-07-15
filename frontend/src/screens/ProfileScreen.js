import React, { useEffect } from 'react';
import { Row, Col, Button, Container, Table } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
import ProfileForm from '../components/ProfileForm';
import { LinkContainer } from 'react-router-bootstrap';
import { getUserOrders } from '../redux/actions/orderActions';
//redux
import { useSelector, useDispatch } from 'react-redux';

const ProfileScreen = ({ history, location }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const redirect = location.search ? location.search.split('=')[1] : '/';
	const {
		loading: userOrdersLoading,
		orders: userOrdersList,
		error: userOrdersError,
	} = useSelector((state) => state.userOrders);
	useEffect(() => {
		dispatch(getUserOrders());
		if (!userInfo) {
			history.push('/signin');
		}
	}, [history, userInfo, dispatch]);
	return (
		<LoadErrHandler>
			<Container>
				<Row className='mt-5'>
					<ProfileForm redirect={redirect} />
					<Col lg={12} md={12} sm={12} className='mt-5'>
						{userOrdersList?.length > 0 && (
							<>
								<h4>My orders</h4>
								{userOrdersLoading && <span>loading...</span>}
								{userOrdersError && <span>Something went wrong!</span>}
								<Table striped bordered hover responsive className='table-sm'>
									<thead>
										<tr>
											<th>ORDER ID</th>
											<th>DATE</th>
											<th>TOTAL</th>
											<th>PAID</th>
											<th>DELIVERED</th>
										</tr>
									</thead>
									<tbody>
										{userOrdersList.map((order) => {
											return (
												<tr key={order._id}>
													<td>{order._id}</td>
													<td>{order.createdAt.substring(0, 10)}</td>
													<td>{order.totalPrice}</td>
													<td>{order.isPaid ? 'Paid' : 'Not paid'}</td>
													<td>
														{order.isDelivered ? 'Delivered' : 'Not Delivered'}
													</td>
													<td>
														<LinkContainer to={`/order/${order._id}`}>
															<Button variant='light'>Details</Button>
														</LinkContainer>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</>
						)}
					</Col>
				</Row>
			</Container>
		</LoadErrHandler>
	);
};

export default ProfileScreen;
