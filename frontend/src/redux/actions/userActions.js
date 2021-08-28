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
