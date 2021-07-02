import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
import LoginForm from '../components/LoginForm';
//redux
import { useSelector } from 'react-redux';

const SideImage = () => (
	<Col
		className='hide-sm'
		lg={6}
		md={0}
		sm={0}
		style={{
			backgroundImage: 'url(/images/shop-login.jpg)',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
		}}
	/>
);

const SignInScreen = ({ history, location }) => {
	const { loading, userInfo } = useSelector((state) => state.userLogin);
	const redirect = location.search ? location.search.split('=')[1] : '/';
	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [userInfo, history, redirect]);
	return (
		<LoadErrHandler loading={loading ? loading : false}>
			<Container>
				<Row>
					<SideImage />
					<LoginForm redirect={redirect} />
				</Row>
			</Container>
		</LoadErrHandler>
	);
};

export default SignInScreen;
