import React, { useEffect } from 'react';
import { Table, Button, Alert, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions/productsActions';

const ProductsListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector((state) => state.products);
	const { userInfo } = useSelector((state) => state.userLogin);
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			// dispatch(deleteUser(id));
		}
	};
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getProducts());
		} else {
			history.push('/');
		}
	}, [dispatch, userInfo, history]);

	return (
		<LoadErrHandler
			loading={loading}
			error={error ? 'Ops! something went wrong' : ''}
		>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3'>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{products?.length > 0 ? (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<LinkContainer to={`/admin/product/${product._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(product._id)}
									>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<h5>There are no products</h5>
			)}
		</LoadErrHandler>
	);
};

export default ProductsListScreen;
