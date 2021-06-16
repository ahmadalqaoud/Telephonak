import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { getProducts } from '../redux/actions/productsActions';
import LoadingErrHandler from '../components/LoadErrHandler';

//redux
import { useSelector, useDispatch } from 'react-redux';
const HomeScreen = () => {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.products);
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);
	return (
		<>
			<LoadingErrHandler
				loading={loading}
				error={error ? 'OOPS! Something went wrong!' : false}
			>
				<h1>LATEST </h1>
				<Row>
					{products && products.length > 0 ? (
						<>
							{products.map((product) => {
								return (
									<Col key={product._id} sm={12} md={4} lg={4} xl={3}>
										<Product product={product} />
									</Col>
								);
							})}
						</>
					) : (
						<h6>There are no products for now!</h6>
					)}
				</Row>
			</LoadingErrHandler>
		</>
	);
};

export default HomeScreen;
