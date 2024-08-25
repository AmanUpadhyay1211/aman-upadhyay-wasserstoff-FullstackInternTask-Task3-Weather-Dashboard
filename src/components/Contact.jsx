import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here
    toast.success('Message sent successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600 text-white p-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our app, want to collaborate, or just want to say hello, feel free to reach out.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className="w-full mt-2 p-2 rounded-md text-gray-800"
            placeholder="Your Name" 
            required 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-semibold">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            className="w-full mt-2 p-2 rounded-md text-gray-800"
            placeholder="Your Email" 
            required 
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-semibold">Message</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange}
            className="w-full mt-2 p-2 rounded-md text-gray-800"
            placeholder="Your Message" 
            required 
          />
        </div>
        <button 
          type="submit"
          className="w-full mt-4 px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-md shadow-lg hover:bg-yellow-500 transition duration-300"
        >
          Send Message
        </button>
      </form>

      <div className="flex space-x-6 mt-10">
        <a href="mailto:support@weatherapp.com">
          <FaEnvelope size={40} className="hover:text-yellow-400 transition duration-300" />
        </a>
        <a href="tel:+1234567890">
          <FaPhone size={40} className="hover:text-green-400 transition duration-300" />
        </a>
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

export default Contact;
