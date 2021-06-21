import {
	USER_LOGIN_FAIL,
	USER_LOGIN_LOGOUT,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
} from '../constants/userConstants';

export const userReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: payload };
		case USER_LOGIN_LOGOUT:
			return { loading: false, userInfo: {} };
		default:
			return state;
	}
};
