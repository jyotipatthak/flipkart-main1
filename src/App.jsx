import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './userauthentication/Signup';
import Login from './userauthentication/Login';
import HeroHome from './components/HeroHome';
// import Product from './components/products';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Checkout from './components/Checkout';
import OrderSuccess from './ui/OrderSuccess';
import UserProfile from './ui/profile';
import Wishlist from './components/Wishlist';
import BookmarkPage from './ui/BookmarkPage';

function App() {

  return (
    // BrowserRouter component to enable routing
    <BrowserRouter>
      {/* Navbar component */}
      <Navbar />
      
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    
      {/* Routes component for defining routes */}
      <Routes>
        
        <Route path='/' element={<HeroHome />} /> {/* Route for the home page */}
        
        <Route path='/signup' element={<SignUp />} />  {/* Route for the signup page */}
      
        <Route path='/login' element={<Login />} />      {/* Route for the login page */}
       
        {/* <Route path='/product' element={<Product />} />    Route for the product page */}
        
        <Route path='/cart' element={<Cart />} />   {/* Route for the cart page */}
        
        {/* Use element prop instead of component prop */}
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Use element prop instead of component prop */}
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/bookmark" element={<BookmarkPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
