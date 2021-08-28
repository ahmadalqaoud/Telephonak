import React, { useState } from 'react';
import { Container, Col, Form, Row, Button } from 'react-bootstrap';
//redux
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../../redux/actions/cartActions';
const SideImage = () => (
	<Col
		className='hide-sm'
		lg={6}
		md={0}
		sm={0}
		style={{
			backgroundImage: 'url(/images/payment-shop.jpg)',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
		}}
	/>
);
const PaymentMethod = ({ setCurrentComponentIndex }) => {
	const dispatch = useDispatch();
	const [paymentMethod, setPaymentMethod] = useState('PayPal');
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		setCurrentComponentIndex((prev) => prev + 1);
	};
	return (
		<>
			<SideImage />
			<Col lg={6} md={12} sm={12}>
				<Container style={{ height: '60vh' }}>
					<Form onSubmit={(e) => onSubmit(e)}>
						<h3>Payment Method</h3>
						<h6>
							You can pay using either PayPal or Stripe , Choose the Payment
							method which suits you.
						</h6>
						<hr />
						<Form.Group className='mt-3'>
							<Form.Check
								type='radio'
								label='PayPal'
								name='PaymentMethod'
								value='PayPal'
								onChange={(e) => setPaymentMethod(e.target.value)}
								checked
							/>
						</Form.Group>
						<div className='py-3 align-self-baseline'>
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
										className='flex-end '
										onClick={() => {
											setCurrentComponentIndex((prev) => prev - 1);
										}}
									>
										BACK
									</Button>
									<Button variant='dark' type='submit' className='flex-start '>
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

export default PaymentMethod;
