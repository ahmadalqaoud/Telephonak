import React, { useEffect } from 'react';
import { cartReset } from '../../redux/actions/cartActions';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Success = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		let timer = setTimeout(() => {
			history.push('/profile');
			dispatch(cartReset());
		}, 5000);
		return () => {
			clearTimeout(timer);
		};
	}, [history, dispatch]);

	//@TODO : MAKE SUCCESS PAGE
	return <div>success</div>;
};

export default Success;
