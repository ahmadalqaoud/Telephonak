import {
	USER_LOGIN_FAIL,
	USER_LOGIN_LOGOUT,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_RESET,
	USER_UPDATE_PROFILE_SUCCESS,
	USERS_LIST_FAIL,
	USERS_LIST_REQUEST,
	USERS_LIST_SUCCESS,
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	UPDATE_ADMIN_ROLE_FAIL,
	UPDATE_ADMIN_ROLE_REQUEST,
	UPDATE_ADMIN_ROLE_SUCCESS,
	UPDATE_USER_ROLE_FAIL,
	UPDATE_USER_ROLE_REQUEST,
	UPDATE_USER_ROLE_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: payload };
		case USER_LOGIN_LOGOUT:
			return { loading: false, userInfo: null };
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

export const userDetailsReducer = (state = { user: {} }, action) => {
	const { payload, type } = action;
	switch (type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: payload };
		case USER_DETAILS_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};
export const userUpdateDetailsReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return { loading: true };
		case USER_UPDATE_PROFILE_SUCCESS:
			return { loading: false, userInfo: payload, success: true };
		case USER_UPDATE_PROFILE_FAIL:
			return { loading: false, error: payload, success: false };
		case USER_UPDATE_PROFILE_RESET:
			return {};
		default:
			return state;
	}
};
export const usersListReducer = (state = { users: [] }, action) => {
	const { payload, type } = action;
	switch (type) {
		case USERS_LIST_REQUEST:
			return { loading: true };
		case USERS_LIST_SUCCESS:
			return { loading: false, users: payload };
		case USERS_LIST_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};
export const userDeleteReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case USER_DELETE_REQUEST:
			return { loading: true };
		case USER_DELETE_SUCCESS:
			return { loading: false, success: true };
		case USER_DELETE_FAIL:
			return { loading: false, error: payload, success: false };
		default:
			return state;
	}
};

export const userRoleReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case UPDATE_ADMIN_ROLE_REQUEST:
		case UPDATE_USER_ROLE_REQUEST:
			return { loading: true };
		case UPDATE_ADMIN_ROLE_SUCCESS:
		case UPDATE_USER_ROLE_SUCCESS:
			return { loading: false, success: true };
		case UPDATE_ADMIN_ROLE_FAIL:
		case UPDATE_USER_ROLE_FAIL:
			return { loading: false, error: payload, success: false };
		default:
			return state;
	}
};
