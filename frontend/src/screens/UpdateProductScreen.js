import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PRODUCT_CREATE_RESET } from '../redux/constants/productsConstants';
const UpdateProductScreen = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });
	}, [dispatch]);
	return <div>hi</div>;
};

export default UpdateProductScreen;
