import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
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
