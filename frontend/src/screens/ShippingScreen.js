import React, { useState } from 'react';
import ShippingInformations from '../components/ShippingSteps/ShippingInformations';
import PaymentMethod from '../components/ShippingSteps/PaymentMethod';
import { Container, Row } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
import Steps from '../components/Steps';

const ShippingScreen = () => {
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
