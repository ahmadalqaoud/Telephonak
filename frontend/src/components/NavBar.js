import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import DropDownNav from './DropDownNav';
const NavBar = ({ userLogin }) => {
	// const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	console.log(userInfo);
	return (
		<>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<LinkContainer exact to='/'>
						<Navbar.Brand>TELEPHONAK</Navbar.Brand>
					</LinkContainer>
					<Nav>
						{userInfo ? (
							<DropDownNav userName={userInfo.name} />
						) : (
							<LinkContainer to='/SignIn'>
								<Nav.Link>
									<i className='fas fa-user' /> {` `}
									Sign In
								</Nav.Link>
							</LinkContainer>
						)}
						<LinkContainer exact to='/Cart'>
							<Nav.Link>
								<i className='fas fa-shopping-cart' /> {` `}
								<span className='hide-sm'>CART</span> {` `}
								{/* {cartItems && cartItems.length > 0 && (
									<p className='cart-counter'>{cartItems.length}</p>
								)} */}
							</Nav.Link>
						</LinkContainer>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
