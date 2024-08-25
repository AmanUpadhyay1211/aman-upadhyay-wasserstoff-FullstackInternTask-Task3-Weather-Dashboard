import React from 'react';
import { FaCloudRain, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // or next/link for Next.js

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white p-8">
      <FaCloudRain size={80} className="text-yellow-400 mb-6 animate-bounce" />
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Oops! Page Not Found</p>
      <p className="text-lg mt-2 max-w-lg text-center">
        It seems like you've reached a place where the clouds are confused! Don't worry, let's get you back to safe weather.
      </p>
      
      <Link to="/" className="mt-8 px-8 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-md shadow-lg hover:bg-yellow-500 transition duration-300 flex items-center space-x-2">
        <FaHome size={20} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
