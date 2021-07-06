import {
	CART_REMOVE_ITEM,
	CART_ADD_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';
export const cartReducer = (
	state = { cartItems: [], ShippingAddress: {} },
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
				return { cartItems: [...state.cartItems, payload] };
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
		default:
			return state;
	}
};
