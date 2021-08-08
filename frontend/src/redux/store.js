import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productsReducers';
import { cartReducer } from './reducers/CartReducers';

const reducer = combineReducers({
	products: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
});
const LocalStorageCartItems = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];
const initialState = {
	cart: { cartItems: LocalStorageCartItems },
};
const Middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...Middleware)),
);

export default store;
