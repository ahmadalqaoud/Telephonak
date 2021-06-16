import React from 'react';
import { Spinner, Container, Alert } from 'react-bootstrap';

const LoadErrHandler = ({ children, loading, error }) => {
	return (
		<>
			{loading ? (
				<Container className='flex-center-container'>
					<Spinner animation='border' role='status'>
						<span className='sr-only'>Loading...</span>
					</Spinner>
				</Container>
			) : error ? (
				<Alert variant='danger'>{error}</Alert>
			) : (
				children
			)}
		</>
	);
};
export default LoadErrHandler;
