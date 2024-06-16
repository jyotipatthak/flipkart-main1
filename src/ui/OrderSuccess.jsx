import React, { useState } from 'react';
import { FaBackward, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const [stars, setStars] = useState([false, false, false, false, false]); // Array to track star states

  // Function to toggle star state on click
  const toggleStar = (index) => {
    const newStars = [...stars];
    newStars[index] = !newStars[index];
    setStars(newStars);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-screen overflow-y-auto relative">
        {/* Close button */}
        <Link to="/" className="absolute top-4 right-4 text-red-700 hover:text-gray-700">
          <FaBackward size={24} />
        </Link>

        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:ml-6 flex flex-col w-full">
            {/* Success message */}
            <h1 className="text-4xl font-semibold text-black mb-4 text-center md:text-left">Order Placed Successfully!</h1>
            <p className="text-gray-700 mb-6 text-center md:text-left">Thank you for your purchase.</p>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              {/* Render stars dynamically */}
              {stars.map((active, index) => (
                <button
                  key={index}
                  className={`bg-${active ? 'gray' : 'blue'}-700 text-white  font-bold py-2 px-4 rounded-full flex items-center`}
                  onClick={() => toggleStar(index)}
                >
                  <FaStar className="mr-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
