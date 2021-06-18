import axios from 'axios';
import { CART_REMOVE_ITEM, CART_ADD_ITEM } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);
	await dispatch({
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
};
