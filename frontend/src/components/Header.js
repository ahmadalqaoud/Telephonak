import React from 'react';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';
const Header = () => {
	const userLogin = useSelector((state) => state.userLogin);
	return (
		<header>
			<NavBar userLogin={userLogin} />
		</header>
	);
};

export default Header;
