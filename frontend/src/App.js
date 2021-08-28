//bootstrap
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import OrderScreen from './screens/OrderScreen';
import UsersListScreen from './screens/UsersListScreen';
import ProductsListScreen from './screens/ProductsListScreen';
import UpdateProductScreen from './screens/UpdateProductScreen';
import OrdersScreen from './screens/OrdersScreen';
const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/' exact component={HomeScreen} />
					<Route path='/SignIn' component={SignInScreen} />
					<Route path='/Register' component={RegisterScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/Shipping' component={ShippingScreen} />
					<Route path='/order/:id' component={OrderScreen} />
					<Route path='/admin/usersList' component={UsersListScreen} />
					<Route path='/admin/productsList' component={ProductsListScreen} />
					<Route
						path='/admin/product/:id/edit'
						component={UpdateProductScreen}
					/>
					<Route path='/admin/ordersList' component={OrdersScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
