import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Container, Alert } from 'react-bootstrap';
import LoadErrHandler from './LoadErrHandler';
//redux
import { useSelector, useDispatch } from 'react-redux';
import {
	getUserDetails,
	UpdateUserDetails,
} from '../redux/actions/userActions';
export const ProfileForm = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.userDetails);
	const { error, loading, success } = useSelector(
		(state) => state.userUpdatedDetails,
	);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [disableForm, setDisableForm] = useState(true);
	const [message, setMessage] = useState('');
	const UpdateProfile = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage(`password don't match`);
			return;
		}
		if (!name || !email) {
			setMessage(`please fill the email and name values`);
			return;
		}
		dispatch(UpdateUserDetails(name, email, password));
		setDisableForm(true);
	};
	useEffect(() => {
		if (!user?.name) {
			dispatch(getUserDetails());
		} else {
			setName(user.name);
			setEmail(user.email);
		}
	}, [user, dispatch]);
	return (
		<LoadErrHandler loading={loading}>
			<Col lg={12} md={12} sm={12}>
				<Container>
					<Form onSubmit={(e) => UpdateProfile(e)}>
						<Form.Group className='mt-3'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								value={name}
								onChange={(e) => setName(e.target.value)}
								type='text'
								placeholder={name}
								disabled={disableForm}
							/>
						</Form.Group>
						<Form.Group className='mt-3'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='email'
								placeholder={email}
								disabled={disableForm}
							/>
						</Form.Group>
						<Form.Group className='mt-3'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type='password'
								placeholder='new password'
								disabled={disableForm}
							/>
						</Form.Group>
						<Form.Group className='mt-3'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								type='password'
								placeholder='confirm password'
								disabled={disableForm}
							/>
						</Form.Group>
						<div className='py-3'>
							<Row>
								<Col
									lg={8}
									md={8}
									sm={12}
									className='d-flex full-width justify-content-between '
								>
									<Button
										className='flex-start w-25'
										variant='dark'
										type='button'
										disabled={!disableForm}
										onClick={() => setDisableForm(!disableForm)}
									>
										Edit profile
									</Button>
									<Button
										className='flex-end w-25'
										disabled={disableForm}
										variant='dark'
										type='submit'
									>
										save
									</Button>
								</Col>

								{error && (
									<Col lg={12} md={12} sm={12} className='mt-3'>
										<Alert className='full-width' variant='danger'>
											{error}
										</Alert>
									</Col>
								)}
								{message && (
									<Col lg={12} md={12} sm={12} className='mt-3'>
										<Alert className='full-width' variant='danger'>
											{message}
										</Alert>
									</Col>
								)}
								{success && (
									<Col lg={12} md={12} sm={12} className='mt-3'>
										<Alert className='full-width' variant='success'>
											Profile Has been Updated
										</Alert>
									</Col>
								)}
							</Row>
						</div>
					</Form>
				</Container>
			</Col>
		</LoadErrHandler>
	);
};

export default ProfileForm;
