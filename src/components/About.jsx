import React from 'react';
import { FaCloudSun, FaGithub, FaLinkedin, FaReact } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const About = () => {
  const handleToast = () => {
    toast.info('Thank you for exploring our app!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white p-8">
      <div className="text-center space-y-6">
        <FaCloudSun size={50} className="mx-auto text-yellow-400" />
        <h1 className="text-4xl font-bold">About Our Weather App</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Our Weather App provides real-time weather updates and forecasts for cities around the globe.
          Built with love using <FaReact className="inline text-cyan-400" size={25} /> React.js and the latest web technologies,
          our app ensures that you stay informed about the weather conditions anytime, anywhere.
        </p>
        <p className="text-md">
          We believe that weather information should be easy to access, and our app delivers just that, with a sleek and user-friendly interface.
        </p>
        <button 
          onClick={handleToast}
          className="mt-4 px-6 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-md shadow-lg hover:bg-yellow-500 transition duration-300"
        >
          Say Hello!
        </button>
      </div>

      <div className="flex space-x-6 mt-10">
        <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
          <FaGithub size={40} className="hover:text-gray-300 transition duration-300" />
        </a>
        <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={40} className="hover:text-blue-300 transition duration-300" />
        </a>
      </div>

      <ToastContainer />
    </div>
  );
};

export default About;
