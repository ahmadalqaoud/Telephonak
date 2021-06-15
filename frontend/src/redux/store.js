import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productsReducers';

const reducer = combineReducers({ products: productListReducer });
const initialState = { hi: 'hi' };
const Middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...Middleware)),
);

export default store;
