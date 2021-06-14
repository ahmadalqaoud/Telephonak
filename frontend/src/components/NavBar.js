import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
const NavBar = () => {
	return (
		<>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand href='/'>TELEPHONAK</Navbar.Brand>
					<Nav className='ml-auto'>
						<Nav.Link href='/Cart'>
							<i className='fas fa-shopping-cart' /> {` `}
							CART
						</Nav.Link>
						<Nav.Link href='/SignIn'>
							<i className='fas fa-user' /> {` `}
							Sign In
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	)
}

export default NavBar
