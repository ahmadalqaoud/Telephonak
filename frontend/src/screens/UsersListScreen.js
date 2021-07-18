import React, { useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
import { LinkContainer } from 'react-router-bootstrap';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, deleteUser } from '../redux/actions/userActions';

const UsersListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { loading, error, users } = useSelector((state) => state.usersList);
	const { userInfo } = useSelector((state) => state.userLogin);
	const {
		loading: userDeleteLoading,
		success: userDeleteSuccess,
		error: userDeleteError,
	} = useSelector((state) => state.userDelete);
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			dispatch(deleteUser(id));
		}
	};
	useEffect(() => {
		if ((userInfo && userInfo.isAdmin) || userDeleteSuccess) {
			dispatch(getUsers());
		} else {
			history.push('/');
		}
	}, [dispatch, userInfo, history, userDeleteSuccess]);

	return (
		<LoadErrHandler
			loading={loading}
			error={error ? 'Ops! something went wrong' : ''}
		>
			<h1>users</h1>
			{userDeleteLoading && <h5>loading...</h5>}
			{userDeleteError && (
				<Alert className='full-width' variant='danger'>
					{userDeleteError}
				</Alert>
			)}
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
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => {
												deleteHandler(user._id);
											}}
										>
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
