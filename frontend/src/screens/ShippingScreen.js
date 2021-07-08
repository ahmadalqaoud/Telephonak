import React, { useState, useEffect } from 'react';
import ShippingInformations from '../components/ShippingSteps/ShippingInformations';
import PaymentMethod from '../components/ShippingSteps/PaymentMethod';
import { Container, Row } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
import Steps from '../components/Steps';
import { useSelector, useDispatch } from 'react-redux';

const ShippingScreen = ({ history }) => {
	const { cartItems } = useSelector((state) => state.cart);
	const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
	const currentComponent = () => {
		switch (currentComponentIndex) {
			case 1:
				return (
					<PaymentMethod setCurrentComponentIndex={setCurrentComponentIndex} />
				);
			default:
				return (
					<ShippingInformations
						setCurrentComponentIndex={setCurrentComponentIndex}
					/>
				);
		}
	};
	useEffect(() => {
		if (cartItems.length === 0) {
			history.push('/cart');
		}
	}, [cartItems, history]);

	return (
		<LoadErrHandler>
			<Container>
				<Steps lastStep={3} activeStep={currentComponentIndex - 1} />
				<Row>{currentComponent()}</Row>
			</Container>
		</LoadErrHandler>
	);
};

export default ShippingScreen;
