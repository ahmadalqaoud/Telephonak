import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productsReducers';
import { userReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/CartReducers';

const reducer = combineReducers({
	products: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userReducer,
});
const LocalStorageCartItems = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];
const LocalStorageUserInfo = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;
const initialState = {
	cart: { cartItems: LocalStorageCartItems },
	userLogin: { userInfo: LocalStorageUserInfo },
};
const Middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...Middleware)),
);

export default store;
