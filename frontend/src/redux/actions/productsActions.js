import {
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
} from '../constants/productsConstants';

import axios from 'axios';

export const getProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get('/api/products');
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//remove products
export const removeProduct = (productID) => async (dispatch, getState) => {
	const {
		userLogin: { userInfo },
	} = getState();
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	try {
		dispatch({ type: PRODUCT_DELETE_REQUEST });
		await axios.delete(`/api/products/${productID}`, config);
		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//create product
export const createProduct = () => async (dispatch, getState) => {
	const {
		userLogin: { userInfo },
	} = getState();
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	try {
		dispatch({ type: PRODUCT_CREATE_REQUEST });
		const { data } = await axios.post(`/api/products`, {}, config);
		dispatch({
			payload: data,
			type: PRODUCT_CREATE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//update product
export const updateProduct =
	(productID, productData) => async (dispatch, getState) => {
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
			dispatch({ type: PRODUCT_UPDATE_REQUEST });
			const { data } = await axios.put(
				`/api/products/${productID}`,
				productData,
				config,
			);
			dispatch({ payload: data, type: PRODUCT_UPDATE_SUCCESS });
		} catch (error) {
			dispatch({
				type: PRODUCT_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
