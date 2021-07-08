import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
} from '../constants/orderConstants';

import axios from 'axios';

export const createOrder = (orderData) => async (dispatch, getState) => {
	dispatch({ type: ORDER_CREATE_REQUEST });
	const {
		userLogin: { userInfo },
	} = getState();
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	try {
		const { data } = await axios.post('/api/orders', orderData, config);
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
