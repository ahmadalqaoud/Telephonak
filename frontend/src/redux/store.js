import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productsReducers';

const reducer = combineReducers({
	products: productListReducer,
	productDetails: productDetailsReducer,
});
const initialState = { hi: 'hi' };
const Middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...Middleware)),
);

export default store;
