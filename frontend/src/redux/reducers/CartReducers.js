import { CART_REMOVE_ITEM, CART_ADD_ITEM } from '../constants/cartConstants';
export const cartReducer = (state = { cartItems: [] }, action) => {
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
			return state;
		default:
			return state;
	}
};
