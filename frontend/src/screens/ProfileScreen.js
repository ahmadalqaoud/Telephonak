import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import LoadErrHandler from '../components/LoadErrHandler';
import ProfileForm from '../components/ProfileForm';
//redux
import { useSelector } from 'react-redux';

const SideImage = () => (
	<Col
		className='hide-sm'
		lg={6}
		md={0}
		sm={0}
		style={{
			backgroundImage: 'url(/images/profile-shop.jpg)',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
		}}
	/>
);

const ProfileScreen = ({ history, location }) => {
	const { userInfo } = useSelector((state) => state.userLogin);
	const redirect = location.search ? location.search.split('=')[1] : '/';
	useEffect(() => {
		if (!userInfo) {
			history.push('/signin');
		}
	}, [history, userInfo]);
	return (
		<LoadErrHandler>
			<Container>
				<Row>
					<SideImage />
					<ProfileForm redirect={redirect} />
				</Row>
			</Container>
		</LoadErrHandler>
	);
};

export default ProfileScreen;
