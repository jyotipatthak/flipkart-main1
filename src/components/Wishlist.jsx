// Wishlist.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, removeFromWishlist, addToBookmark, removeFromBookmark } from '../redux/actions';
import { FaTrash, FaCartPlus, FaBookmark } from 'react-icons/fa';

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const bookmark = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  const handleAddToBookmark = (product) => {
    dispatch(addToBookmark(product));
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleRemoveFromBookmark = (productId) => {
    dispatch(removeFromBookmark(productId));
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen p-8 sm:p-12 xl:p-20">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 sm:mt-12">
        Wishlist
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Object.values(wishlist).map((product, index) => (
          <div
            key={index}
            className="border rounded-lg flex flex-col p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              className="w-full h-40 object-cover mb-4 rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
              src={product.image}
              alt={product.title}
            />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              {product.title}
            </h3>
            <p className="text-xl font-bold mb-4 text-indigo-600">
              ${product.price}
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full transition-colors duration-300"
              >
                <FaTrash className="text-white" />
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-full transition-colors duration-300"
              >
                <FaCartPlus className="text-white" />
              </button>
              <button
                onClick={() => handleAddToBookmark(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-full transition-colors duration-300"
              >
                <FaBookmark className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
}

export default Wishlist;
