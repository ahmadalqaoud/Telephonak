import React, { useState } from 'react';
import { Row, Col, Form, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';

export const LoginForm = ({ location, redirect }) => {
	const dispatch = useDispatch();
	const { error } = useSelector((state) => state.userLogin);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const Login = (e) => {
		e.preventDefault();
		dispatch(userLogin(email, password));
		console.log(email, password);
	};
	return (
		<Col lg={6} md={12} sm={12}>
			<Container>
				<Form onSubmit={(e) => Login(e)}>
					<div className='mb-5 mt-5'>
						<h4 className='text-dark'>
							<b>
								<i>WELCOME TO TELEPHONAK SHOP</i>
							</b>
						</h4>
						<h5>
							<i>Where you can find your needs</i>
						</h5>
					</div>
					<Form.Group className='mt-3'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							placeholder='Enter email'
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Label>password</Form.Label>
						<Form.Control
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type='password'
							placeholder='Enter password'
						/>
					</Form.Group>
					<Form.Group className='mt-3'>
						<Form.Check label='Remember me' />
					</Form.Group>
					<div className='py-3'>
						<Row>
							<Col lg={8} md={8} sm={12}>
								<Button variant='dark' type='submit'>
									LOGIN
								</Button>
							</Col>
							<Col lg={8} md={8} sm={12} className='mt-3'>
								<small>
									New customer ?
									<Link
										to={
											redirect ? `/register?redirect=${redirect}` : `/register`
										}
									>
										SIGN UP
									</Link>
								</small>
							</Col>
							{error && (
								<Col lg={12} md={12} sm={12} className='mt-3'>
									<Alert className='full-width' variant='danger'>
										{error}
									</Alert>
								</Col>
							)}
						</Row>
					</div>
				</Form>
			</Container>
		</Col>
	);
};

export default LoginForm;
