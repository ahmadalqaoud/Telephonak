import axios from 'axios';
import {
	CART_REMOVE_ITEM,
	CART_ADD_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_RESET,
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				rating: data.rating,
				qty,
			},
		});
		const LocalStorageCartItems = JSON.stringify(getState().cart.cartItems);
		localStorage.setItem('cartItems', LocalStorageCartItems);
	} catch (error) {
		console.log(error);
	}
};

export const removeFromCart = (productId) => (dispatch, getState) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: { productId: productId } });
	const LocalStorageCartItems = JSON.stringify(getState().cart.cartItems);
	localStorage.setItem('cartItems', LocalStorageCartItems);
};

//save shipping address

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
	localStorage.setItem('ShippingAddress', JSON.stringify(data));
};

//Save Payment method

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
	localStorage.setItem('PaymentMethod', JSON.stringify(data));
};

//cart reset
export const cartReset = () => (dispatch) => {
	localStorage.removeItem('cartItems');
	dispatch({ type: CART_RESET });
};
