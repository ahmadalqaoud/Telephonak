import {
	CART_REMOVE_ITEM,
	CART_ADD_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_RESET,
} from '../constants/cartConstants';
export const cartReducer = (
	state = { cartItems: [], ShippingAddress: {}, PaymentMethod: null },
	action,
) => {
	const { payload, type } = action;
	switch (type) {
		case CART_ADD_ITEM:
			const ItemExist = state.cartItems.find(
				(item) => item.product === payload.product,
			);
			if (ItemExist) {
				return {
					...state,
					cartItems: state.cartItems.map((item) =>
						item.product === ItemExist.product ? payload : item,
					),
				};
			} else {
				return { ...state, cartItems: [...state.cartItems, payload] };
			}

		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: [
					...state.cartItems.filter(
						(item) => item.product !== payload.productId,
					),
				],
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			return { ...state, ShippingAddress: payload };
		case CART_SAVE_PAYMENT_METHOD:
			return { ...state, PaymentMethod: payload };
		case CART_RESET:
			return { ...state, cartItems: [] };
		default:
			return state;
	}
};
