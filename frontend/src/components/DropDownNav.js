import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const DropDownNav = ({ userName }) => {
	const links = [
		{
			name: 'Profile',
			to: '/profile',
		},
		{
			name: 'home',
			to: '/',
		},
	];
	return (
		<NavDropdown drop='left' title={userName.split(' ')[0]} variant='dark'>
			{links.map((link) => {
				return (
					<LinkContainer exact to={link.to} key={link.to}>
						<NavDropdown.Item>{link.name}</NavDropdown.Item>
					</LinkContainer>
				);
			})}
			<NavDropdown.Divider />
			<NavDropdown.Item as='button'>Sign out</NavDropdown.Item>
		</NavDropdown>
	);
};

export default DropDownNav;
