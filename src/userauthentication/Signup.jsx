import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../ui/Toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/user/register', formData, { withCredentials: true });
      Toast.success('User registered successfully');
      navigate('/login');
    } catch (error) {
      Toast.error(`Error in registering the user: ${error.response?.data?.error}`);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-16 bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row m-4 max-w-4xl w-full">
        <div className="md:w-2/5 bg-blue-500 text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">
            Looks like you're new here!
          </h2>
          <p className="text-lg mb-8 tracking-wider text-left">
            Sign up with your Email to get started
          </p>
        </div>
        <div className="md:w-3/5 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">
                Sign up
              </h2>
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm text-left font-semibold text-gray-600"
              >
                Enter your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-b-2 border-red-600 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-left font-semibold text-gray-600"
              >
                Enter your Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-b-2 border-red-600 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm text-left font-semibold text-gray-600"
              >
                Enter your Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-b-2 border-red-600 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600"
            >
              CONTINUE
            </button>
          </form>
          <hr className="my-4" />
          <div className="text-center">
            <Link to="/login" className="text-blue-500">
              Existing User? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
