import './App.css';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Success from './pages/Success';
import {useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import { useLayoutEffect } from 'react';

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
};
const App = () => {
  const user = useSelector((state)=>state.user.currentUser);
  const newUser = useSelector((state)=> state.newUser.registered);
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/products/:category' element={<ProductList/>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/success' element={<Success/>}/>
          <Route exact path='/login' element={user ? <Navigate to="/"/> : <Login/>}/>
          <Route exact path='/register' element={newUser ?<Navigate to="/login"/> : <Register/>}/>
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
