import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
const NavBar = () => {
	// const { cartItems } = useSelector((state) => state.cart);
	return (
		<>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<LinkContainer exact to='/'>
						<Navbar.Brand>TELEPHONAK</Navbar.Brand>
					</LinkContainer>
					<Nav className='ml-auto'>
						<LinkContainer exact to='/Cart'>
							<Nav.Link>
								<i className='fas fa-shopping-cart' /> {` `}
								CART {` `}
								{/* {cartItems && cartItems.length > 0 && (
									<p className='cart-counter'>{cartItems.length}</p>
								)} */}
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/SignIn'>
							<Nav.Link>
								<i className='fas fa-user' /> {` `}
								Sign In
							</Nav.Link>
						</LinkContainer>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
