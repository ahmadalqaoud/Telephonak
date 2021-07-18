import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
import { LinkContainer } from 'react-router-bootstrap';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../redux/actions/userActions';

const UsersListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { loading, error, users } = useSelector((state) => state.usersList);
	const { userInfo } = useSelector((state) => state.userLogin);
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getUsers());
		} else {
			history.push('/');
		}
	}, [dispatch, userInfo, history]);

	return (
		<LoadErrHandler
			loading={loading}
			error={error ? 'Ops! something went wrong' : ''}
		>
			<h1>users</h1>
			{users ? (
				<Table striped bordered hovered responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>ROLE</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => {
							return (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.isAdmin ? 'Admin' : 'User'}</td>
									<td>
										<LinkContainer to={`/user/${user._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												EDIT
											</Button>
										</LinkContainer>
										<Button variant='danger' className='btn-sm'>
											DELETE
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			) : (
				<h5>There are no users</h5>
			)}
		</LoadErrHandler>
	);
};

export default UsersListScreen;
