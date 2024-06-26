import React from "react";
import { FaHeart, FaBookmark, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist, addToBookmark, removeFromBookmark } from '../redux/actions';

const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);
  const bookmark = useSelector(state => state.bookmark);

  if (!product) return null;

  // Generate a random discount between 5% and 30%
  const discount = Math.floor(Math.random() * 26) + 5;

  // Check if product is in wishlist or bookmark
  const isInWishlist = wishlist[product.id];
  const isInBookmark = bookmark[product.id];

  // Handle bookmarking a product
  const handleBookmark = (product) => {
    if (isInBookmark) {
      dispatch(removeFromBookmark(product.id));
    } else {
      dispatch(addToBookmark(product));
    }
  };

  // Handle adding/removing a product to/from wishlist
  const handleWishlist = (product) => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-screen overflow-y-auto relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FaTimes size={24} />
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Product image */}
          <img
            className="h-64 w-full md:w-1/2 rounded object-contain mb-4 md:mb-0"
            src={product.image}
            alt={product.title}
          />
          <div className="md:ml-6 flex flex-col w-full md:w-1/2">
            {/* Product title */}
            <h3 className="text-2xl font-bold mb-2 text-center md:text-left">{product.title}</h3>
            {/* Product price */}
            <p className="text-xl font-semibold mb-4 text-center md:text-left">Price: ${product.price}</p>
            {/* Product description */}
            <p className="text-sm mb-4 text-center md:text-left">{product.description}</p>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              {/* Wishlist button */}
              <button
                className={`bg-gray-800  text-white font-bold py-2 px-4 rounded-full flex items-center ${
                  isInWishlist ? 'bg-green-500' : ''
                }`}
                onClick={() => handleWishlist(product)}
              >
                {isInWishlist ? (
                  <>
                    <FaHeart className="mr-2" /> Wishlisted
                  </>
                ) : (
                  <>
                    <FaHeart className="mr-2" /> Wishlist
                  </>
                )}
              </button>
              {/* Bookmark button */}
              <button
                className={`bg-blue-700  text-white font-bold py-2 px-4 rounded-full flex items-center ${
                  isInBookmark ? 'bg-yellow-500' : ''
                }`}
                onClick={() => handleBookmark(product)}
              >
                {isInBookmark ? (
                  <>
                    <FaBookmark className="mr-2" /> Bookmarked
                  </>
                ) : (
                  <>
                    <FaBookmark className="mr-2" /> Bookmark
                  </>
                )}
              </button>
            </div>
            {/* Display the generated discount */}
            <p className="text-center md:text-left text-lg text-red-900 font-bold">Discount: {discount}% off</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
