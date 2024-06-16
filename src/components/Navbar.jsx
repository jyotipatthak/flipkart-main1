import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PiShoppingCartFill } from "react-icons/pi";
import { FaBars, FaTimes, FaHeart, FaBookmark  } from 'react-icons/fa';
import { BsBookmarkPlusFill,BsChatLeftHeartFill } from "react-icons/bs";
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
        <div className="hidden md:flex items-center gap-4 md:gap-8">
          <Link to="/wishlist" className="hover:text-blue-600">
            <BsChatLeftHeartFill className="text-2xl" />
          </Link>
          <Link to="/bookmark" className="hover:text-blue-600">
          <BsBookmarkPlusFill className="text-2xl" />
          </Link>
          <div className="relative flex items-center">
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
              <div className="relative flex items-center">
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
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="py-1 px-4 text-md text-blue-950 hover:bg-blue-700 hover:text-white rounded items-center gap-2"
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
        <div className={`flex flex-col md:hidden ${isMenuOpen ? 'flex' : 'hidden'} items-center bg-white absolute top-16 left-0 w-full shadow-md p-4`}>
          <div className="flex flex-row items-center justify-around w-full">
            <Link to="/wishlist" className="hover:text-blue-600 mx-2">
              <FaHeart className="text-2xl" />
            </Link>
            <Link to="/bookmark" className="hover:text-blue-600 mx-2">
              <FaBookmark className="text-2xl" />
            </Link>
            <div className="relative flex items-center mx-2">
              <Link to="/cart" className='flex items-center hover:text-blue-700 relative'>
                <PiShoppingCartFill className='h-8 w-8 text-black' />
                {totalItems > 0 && (
                  <span className='absolute top-0 right-0 text-red-700 rounded-full text-lg p-1'>
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
            {isAuthenticated ? (
              <>
                <div className="relative flex items-center mx-2">
                  <button
                    onClick={() => setIsUserProfileOpen(true)}
                    className="hover:bg-blue-700 hover:text-white rounded-full p-2"
                  >
                    <VscAccount className="h-6 w-6 text-black" />
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 text-md text-blue-950 hover:bg-blue-700 hover:text-white rounded flex items-center gap-2 mx-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="py-1 px-4 text-md text-blue-950 hover:bg-blue-700 hover:text-white rounded flex items-center gap-2 mx-2"
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
      </div>
      {isUserProfileOpen && isAuthenticated && <UserProfile onClose={() => setIsUserProfileOpen(false)} />}
    </nav>
  );
};

export default Navbar;
