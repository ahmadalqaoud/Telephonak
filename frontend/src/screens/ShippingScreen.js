import React, { useState } from 'react';
import ShippingInformations from '../components/ShippingSteps/ShippingInformations';
import { Container, Col, Row } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';

const ShippingScreen = () => {
	const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
	const currentComponent = () => {
		switch (currentComponentIndex) {
			case 1:
				return <div>hi</div>;
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
				<Row>{currentComponent()}</Row>
			</Container>
		</LoadErrHandler>
	);
};

export default ShippingScreen;
