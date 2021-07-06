import React from 'react';

const Steps = ({ lastStep, activeStep }) => {
	const steps = [
		{
			name: 'Shipping',
			icon: 'fas fa-shipping-fast',
		},
		{
			name: 'Payment',
			icon: 'fas fa-shopping-cart',
		},
		{
			name: 'Payment',
			icon: 'fas fa-shipping-fast',
		},
		{
			name: 'Payment',
			icon: 'fas fa-shipping-fast',
		},
	];
	return (
		<div className='stepsContainer'>
			{steps.map((step, index) => {
				return (
					<React.Fragment key={index}>
						<div className={`step ${activeStep < index && 'disabled'}`}>
							<i className={step.icon}></i>
						</div>
						{lastStep !== index && (
							<div className={`line ${activeStep < index && 'disabled'}`} />
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default Steps;
