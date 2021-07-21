import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS,
	USER_ORDERS_FAIL,
	USER_ORDERS_REQUEST,
	USER_ORDERS_SUCCESS,
	ORDERS_DETAILS_REQUEST,
	ORDERS_DETAILS_SUCCESS,
	ORDERS_DETAILS_FAIL,
	ORDER_DELIVERED_REQUEST,
	ORDER_DELIVERED_SUCCESS,
	ORDER_DELIVERED_FAIL,
	ORDER_DELIVERED_RESET,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return { loading: false, order: payload, success: true };
		case ORDER_CREATE_FAIL:
			return { loading: false, success: false, error: payload };
		default:
			return state;
	}
};

export const orderDetailsReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case ORDER_DETAILS_REQUEST:
			return { loading: true };
		case ORDER_DETAILS_SUCCESS:
			return { loading: false, order: payload, success: true };
		case ORDER_DETAILS_FAIL:
			return { loading: false, success: false, error: payload };
		default:
			return state;
	}
};

export const orderPayReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case ORDER_PAY_REQUEST:
			return { loading: true };
		case ORDER_PAY_SUCCESS:
			return { loading: false, order: payload, success: true };
		case ORDER_PAY_FAIL:
			return { loading: false, success: false, error: payload };
		case ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};
export const orderDeliverReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case ORDER_DELIVERED_REQUEST:
			return { loading: true };
		case ORDER_DELIVERED_SUCCESS:
			return { loading: false, order: payload, success: true };
		case ORDER_DELIVERED_FAIL:
			return { loading: false, success: false, error: payload };
		case ORDER_DELIVERED_RESET:
			return {};
		default:
			return state;
	}
};

export const userOrdersReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case USER_ORDERS_REQUEST:
			return { loading: true };
		case USER_ORDERS_SUCCESS:
			return { loading: false, orders: payload };
		case USER_ORDERS_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

export const ordersDetailsReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case ORDERS_DETAILS_REQUEST:
			return { loading: true };
		case ORDERS_DETAILS_SUCCESS:
			return { loading: false, orders: payload };
		case ORDERS_DETAILS_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};
