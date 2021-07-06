import React, { useState } from 'react';
import { Container, Col, Form, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from '../../redux/actions/cartActions';
const SideImage = () => (
	<Col
		className='hide-sm'
		lg={6}
		md={0}
		sm={0}
		style={{
			backgroundImage: 'url(/images/shipping-shop.jpg)',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
		}}
	/>
);
const ShippingInformations = ({ setCurrentComponentIndex }) => {
	const dispatch = useDispatch();
	const { ShippingAddress } = useSelector((state) => state.cart);
	const history = useHistory();
	const [address, setAddress] = useState(ShippingAddress.address);
	const [city, setCity] = useState(ShippingAddress.city);
	const [postalCode, setPostalCode] = useState(ShippingAddress.postalCode);
	const [country, setCountry] = useState(ShippingAddress.country);
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		setCurrentComponentIndex((prev) => prev + 1);
	};
	return (
		<>
			<SideImage />
			<Col lg={6} md={12} sm={12}>
				<Container>
					<Form onSubmit={(e) => onSubmit(e)}>
						<h3>Shipping Information's</h3>
						<h6>
							Please provide us with your correct shipping information to avoid
							any confusions.
						</h6>
						<hr />
						<Form.Group className='mt-3'>
							<Form.Label>Address</Form.Label>
							<Form.Control
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								type='address'
								placeholder='Your Address'
							/>
						</Form.Group>
						<Form.Group className='mt-3'>
							<Form.Label>City</Form.Label>
							<Form.Control
								value={city}
								onChange={(e) => setCity(e.target.value)}
								type='text'
								placeholder='City'
							/>
						</Form.Group>
						<Form.Group className='mt-3'>
							<Form.Label>Country</Form.Label>
							<Form.Control
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								type='text'
								placeholder='City'
							/>
						</Form.Group>
						<Form.Group className='mt-3'>
							<Form.Label>Postal Code</Form.Label>
							<Form.Control
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								type='text'
								placeholder='your Postal code'
							/>
						</Form.Group>
						<div className='py-3'>
							<Row>
								<Col
									lg={8}
									md={8}
									sm={12}
									className='justify-content-between d-flex w-100'
								>
									<Button
										variant='dark'
										type='button'
										className='flex-end w-25'
										onClick={() => {
											history.push('/cart');
										}}
									>
										CANCEL
									</Button>
									<Button
										variant='dark'
										type='submit'
										className='flex-start w-25'
									>
										NEXT
									</Button>
								</Col>
							</Row>
						</div>
					</Form>
				</Container>
			</Col>
		</>
	);
};

export default ShippingInformations;
