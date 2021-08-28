import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	USER_ORDERS_FAIL,
	USER_ORDERS_REQUEST,
	USER_ORDERS_SUCCESS,
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

//get order by id
export const getOrderById = (orderId) => async (dispatch, getState) => {
	dispatch({ type: ORDER_DETAILS_REQUEST });
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
		const { data } = await axios.get(`/api/orders/${orderId}`, config);
		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// Update order to paid
export const updateOrderToPaid =
	(orderId, paymentResult) => async (dispatch, getState) => {
		dispatch({ type: ORDER_PAY_REQUEST });
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
			const { data } = await axios.put(
				`/api/orders/${orderId}/pay`,
				paymentResult,
				config,
			);
			dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORDER_PAY_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

//get user orders
export const getUserOrders = () => async (dispatch, getState) => {
	dispatch({ type: USER_ORDERS_REQUEST });
	const {
		userLogin: { userInfo },
	} = getState();
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	try {
		const { data } = await axios.get('/api/orders/', config);
		dispatch({ type: USER_ORDERS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_ORDERS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
