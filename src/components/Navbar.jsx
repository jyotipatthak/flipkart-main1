import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PiShoppingCartFill } from "react-icons/pi";
import { FaBars, FaTimes, FaHeart, FaBookmark } from 'react-icons/fa';
import Search from '../ui/Searchbar';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions';
import Cookies from 'js-cookie';
import UserProfile from '../ui/profile';
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  const handleLogout = () => {
    Cookies.remove('token'); // Remove the token from cookies
    dispatch(logout()); // Dispatch the logout action
  };

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md p-2 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes className="h-6 w-6 text-black" /> : <FaBars className="h-6 w-6 text-black" />}
          </button>
          <Link to="/" className="md:hidden">
            <img src='/flip.jpg' className='h-14 w-20 py-2' alt='Logo' />
          </Link>
        </div>
        <div className="flex-1 flex gap-8 items-center justify-center">
          <Link to="/" className="hidden md:block">
            <img src='/flip.jpg' className='h-14 w-20 py-2' alt='Logo' />
          </Link>
          <div className='w-full md:w-96'>
            <Search className="mx-4" />
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/wishlist" className="hidden md:flex hover:text-blue-600">
            <FaHeart className="text-2xl" />
          </Link>
          <Link to="/bookmark" className="hidden md:flex hover:text-blue-600">
            <FaBookmark className="text-2xl" />
          </Link>
          <div className="relative hidden md:flex items-center">
            <Link to="/cart" className='flex items-center hover:text-blue-700 relative'>
              <PiShoppingCartFill className='h-8 w-8 text-black' />
              {totalItems > 0 && (
                <span className='absolute top-0 right-0 text-red-700 rounded-full bg-white text-lg p-1' style={{ transform: 'translate(50%, -50%)' }}>
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          {isAuthenticated ? (
            <>
              <div className="relative hidden md:flex items-center">
                <button
                  onClick={() => setIsUserProfileOpen(true)}
                  className="hover:bg-blue-700 hover:text-white rounded-full p-2"
                >
                  <VscAccount className="h-6 w-6 text-black" />
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="py-2 px-4 text-md text-white bg-blue-700 hover:bg-blue-700 hover:text-white rounded flex items-center gap-2"
              >
                {/* <img
                  // src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg'
                  alt="Profile Icon"
                  className="h-8 w-8"
                /> */}
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex py-1 px-4 text-md text-blue-950 hover:bg-blue-700 hover:text-white rounded  items-center gap-2"
            >
              <img
                src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg'
                alt="Profile Icon"
                className="h-8 w-8"
              />
              Login
            </Link>
          )}
        </div>
        <div className={`flex flex-col md:flex-row md:gap-8 ${isMenuOpen ? 'flex' : 'hidden'} md:hidden items-center bg-white md:bg-transparent absolute md:static top-16 md:top-auto left-0 w-full md:w-auto shadow-md md:shadow-none p-4 md:p-0`}>
          <Link to="/wishlist" className="hover:text-blue-600">
            <FaHeart className="text-2xl" />
          </Link>
          <Link to="/bookmark" className="hover:text-blue-600">
            <FaBookmark className="text-2xl" />
          </Link>
          <div className="relative flex items-center">
            <Link to="/cart" className='flex items-center hover:text-blue-700 relative'>
              <PiShoppingCartFill className='h-8 w-8 text-black' />
              {totalItems > 0 && (
                <span className='absolute top-0 right-0 text-red-700 rounded-full text-lg p-1'  >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          {isAuthenticated ? (
            <>
              <button
                onClick={handleLogout}
                className="py-2 px-4 text-md text-blue-950 hover:bg-blue-700 hover:text-white rounded flex items-center gap-2"
              >
                <img
                  src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg'
                  alt="Profile Icon"
                  className="h-8 w-8"
                />
                Logout
              </button>
              <div className="relative flex items-center">
                <button
                  onClick={() => setIsUserProfileOpen(true)}
                  className="hover:bg-blue-700 hover:text-white rounded-full p-2"
                >
                  <VscAccount className="h-6 w-6 text-black" />
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="py-1 px-4 text-md text-blue-950 hover:bg-blue-700 hover:text-white rounded flex items-center gap-2"
            >
              <img
                src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg'
                alt="Profile Icon"
                className="h-8 w-8"
              />
              Login
            </Link>
          )}
        </div>
      </div>
      {isUserProfileOpen && isAuthenticated && <UserProfile onClose={() => setIsUserProfileOpen(false)} />}
    </nav>
  );
};

export default Navbar;
