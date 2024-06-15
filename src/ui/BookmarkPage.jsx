// BookmarkPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, removeFromBookmark } from '../redux/actions';
import { FaTrash, FaCartPlus, FaBookmark } from 'react-icons/fa';

function BookmarkPage() {
  const bookmark = useSelector((state) => state.bookmark); // Corrected selector to select bookmark state
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    dispatch(removeFromBookmark(product.id));
  };

  const handleRemoveFromBookmark = (productId) => {
    dispatch(removeFromBookmark(productId));
  };

  // Define handleToggleBookmark if needed
  const handleToggleBookmark = (product) => {
    if (bookmark[product.id]) {
      dispatch(removeFromBookmark(product.id));
    } else {
      // Implement addToBookmark action if needed
      // dispatch(addToBookmark(product));
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen p-8 sm:p-12 xl:p-20">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 sm:mt-12">
        Bookmarks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Object.values(bookmark).map((product, index) => (
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
                onClick={() => handleRemoveFromBookmark(product.id)}
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
              <FaBookmark
                className={`text-blue-500 text-2xl cursor-pointer ${bookmark[product.id] ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => handleToggleBookmark(product)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookmarkPage;
