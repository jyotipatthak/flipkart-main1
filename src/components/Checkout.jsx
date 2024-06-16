import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Checkout = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');

  // Retrieve authToken from cookies
  const authToken = Cookies.get('token');

  // Calculate total amount based on cart items
  const calculateTotalAmount = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  // Handle placing the order
  const handlePlaceOrder = async () => {
    const items = Object.keys(cart).map(productId => ({
      product: cart[productId].product.title, // Store product title in the 'product' field
      quantity: cart[productId].quantity,
    }));

    const order = {
      items,
      address: {
        addressLine: address,
        pincode,
        city,
        state,
      },
      paymentMethod,
      totalAmount: calculateTotalAmount(), // Calculate total amount based on cart
    };

    try {
      // Check if authToken is present
      if (!authToken) {
        console.error('Error placing order: No auth token found');
        return;
      }

      const response = await axios.post('https://flipkart-main1-1.onrender.com/api/orders', order, { headers: { Authorization: `Bearer ${authToken}` } });

      // Check if response is successful
      if (response.status === 201) {
        dispatch({ type: 'CLEAR_CART' });
        navigate('/order-success');
      } else {
        console.error('Error placing order: Unexpected response status', response.status);
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response && error.response.status === 401) {
        console.error('Error placing order: Unauthorized');
      } else {
        console.error('Error placing order:', error.message);
      }
    }
  };

  return (
    <div className="container mx-auto mt-14 p-4">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Address</h2>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Address</label>
              <input
                type="text"
                placeholder="Enter address"
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Pincode</label>
              <input
                type="text"
                placeholder="Enter pincode"
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">State</label>
              <input
                type="text"
                placeholder="Enter state"
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Details</h2>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Payment Method</label>
              <select
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">CVV</label>
              <input
                type="text"
                placeholder="Enter CVV"
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
        <ul className="divide-y divide-gray-200">
          {Object.values(cart).map((item, index) => (
            <li key={index} className="flex justify-between py-2">
              <span>{item.product.title}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between py-2 font-bold text-lg">
          <span>Total</span>
          <span>${calculateTotalAmount().toFixed(2)}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
