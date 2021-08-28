import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productsReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateDetailsReducer,
} from './reducers/userReducers';
import { orderCreateReducer } from './reducers/orderReducers';
import { cartReducer } from './reducers/CartReducers';

const reducer = combineReducers({
	products: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdatedDetails: userUpdateDetailsReducer,
	orderCreate: orderCreateReducer,
});
const LocalStorageCartItems = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];
const LocalStorageUserInfo = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;
const localStorageShippingAddress = localStorage.getItem('ShippingAddress')
	? JSON.parse(localStorage.getItem('ShippingAddress'))
	: {};
const localStoragePaymentMethod = localStorage.getItem('PaymentMethod')
	? JSON.parse(localStorage.getItem('PaymentMethod'))
	: null;
const initialState = {
	cart: {
		cartItems: LocalStorageCartItems,
		ShippingAddress: localStorageShippingAddress,
		PaymentMethod: localStoragePaymentMethod,
	},
	userLogin: { userInfo: LocalStorageUserInfo },
};
const Middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...Middleware)),
);

export default store;
