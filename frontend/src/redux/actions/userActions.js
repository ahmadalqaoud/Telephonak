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
import axios from 'axios';
export const userLogin = (email, password) => async (dispatch) => {
	dispatch({ type: USER_LOGIN_REQUEST });
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = { email, password };
	try {
		const { data } = await axios.post(`/api/users/login`, body, config);
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//user logout
export const userLogOut = () => (dispatch) => {
	//TODO remove the entire state from local storage
	localStorage.removeItem('userInfo');
	dispatch({ type: USER_LOGIN_LOGOUT });
};

//user Register
export const userRegister = (name, email, password) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST });
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = { name, email, password };
	try {
		const { data } = await axios.post(`/api/users`, body, config);
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//get current userDetails
export const getUserDetails = () => async (dispatch, getState) => {
	dispatch({ type: USER_DETAILS_REQUEST });
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
		const { data } = await axios.get(`/api/users/profile`, config);
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//get current userDetails
export const UpdateUserDetails =
	(name, email, password) => async (dispatch, getState) => {
		dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo?.token}`,
			},
		};
		const body = { name, email, password };
		try {
			const { data } = await axios.put(`/api/users/profile`, body, config);
			dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
			setTimeout(() => {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
			}, 3000);
		} catch (error) {
			dispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

//get all users for admin
export const getUsers = () => async (dispatch, getState) => {
	dispatch({ type: USERS_LIST_REQUEST });
	const {
		userLogin: { userInfo },
	} = getState();
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	try {
		const { data } = await axios.get(`/api/users`, config);
		dispatch({ type: USERS_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USERS_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//delete user by admin
export const deleteUser = (userID) => async (dispatch, getState) => {
	dispatch({ type: USER_DELETE_REQUEST });
	const {
		userLogin: { userInfo },
	} = getState();
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	try {
		await axios.delete(`/api/users/${userID}`, config);
		dispatch({ type: USER_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//update admin role to user
export const updateAdminRoleToUser = (userID) => async (dispatch, getState) => {
	dispatch({ type: UPDATE_ADMIN_ROLE_REQUEST });
	const {
		userLogin: { userInfo },
	} = getState();
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	const body = {
		role: false,
	};
	try {
		const { data } = await axios.put(`/api/users/role/${userID}`, body, config);
		dispatch({ type: UPDATE_ADMIN_ROLE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: UPDATE_ADMIN_ROLE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//update user role to admin
export const updateUserRoleToAdmin = (userID) => async (dispatch, getState) => {
	dispatch({ type: UPDATE_USER_ROLE_REQUEST });
	const {
		userLogin: { userInfo },
	} = getState();
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	const body = {
		role: true,
	};
	try {
		const { data } = await axios.put(`/api/users/role/${userID}`, body, config);
		dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: UPDATE_USER_ROLE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
