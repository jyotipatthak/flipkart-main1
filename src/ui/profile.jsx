import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const UserProfile = ({ onClose }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    number: '1234567890',
    address: '123 Main St, Springfield, USA',
    email: 'john.doe@example.com',
    password: '********'
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    number: false,
    address: false,
    email: false
  });

  const [tempUser, setTempUser] = useState({ ...user });

  const handleEditClick = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    setUser({ ...tempUser });
    setIsEditing({
      name: false,
      number: false,
      address: false,
      email: false
    });
  };

  const handleCancel = () => {
    setTempUser({ ...user });
    setIsEditing({
      name: false,
      number: false,
      address: false,
      email: false
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-4 rounded-lg w-full max-w-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-black z-10">
          <FaTimes />
        </button>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-semibold mb-4 text-center">User Profile</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              {isEditing.name ? (
                <input
                  type="text"
                  name="name"
                  value={tempUser.name}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                />
              ) : (
                <div className="flex justify-between">
                  <span>{user.name}</span>
                  <button
                    onClick={() => handleEditClick('name')}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Number</label>
              {isEditing.number ? (
                <input
                  type="text"
                  name="number"
                  value={tempUser.number}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                />
              ) : (
                <div className="flex justify-between">
                  <span>{user.number}</span>
                  <button
                    onClick={() => handleEditClick('number')}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Address</label>
              {isEditing.address ? (
                <input
                  type="text"
                  name="address"
                  value={tempUser.address}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                />
              ) : (
                <div className="flex justify-between">
                  <span>{user.address}</span>
                  <button
                    onClick={() => handleEditClick('address')}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              {isEditing.email ? (
                <input
                  type="email"
                  name="email"
                  value={tempUser.email}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                />
              ) : (
                <div className="flex justify-between">
                  <span>{user.email}</span>
                  <button
                    onClick={() => handleEditClick('email')}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="flex justify-between">
                <span>{user.password}</span>
                <button
                  className="text-gray-500 cursor-not-allowed"
                  disabled
                >
                  Edit
                </button>
              </div>
            </div>
            {(isEditing.name || isEditing.number || isEditing.address || isEditing.email) && (
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
