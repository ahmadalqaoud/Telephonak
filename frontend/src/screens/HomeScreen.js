import React from 'react'
import products from '../products'
import { Row, Col, CardGroup } from 'react-bootstrap'
import Product from '../components/Product'
const HomeScreen = () => {
	return (
		<>
			<h1>Latest</h1>
			<Row>
				{products && products.length > 0 ? (
					<>
						{products.map((product) => {
							return (
								<>
									<Col key={product._id} sm={12} md={4} lg={4} xl={3}>
										<Product product={product} />
									</Col>
								</>
							)
						})}
					</>
				) : (
					<h6>There are no products for now!</h6>
				)}
			</Row>
		</>
	)
}

export default HomeScreen
