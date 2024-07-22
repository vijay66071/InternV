import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill all the fields');
      return;
    }
    // http://localhost:3000
    try {
      const response = await Axios.post('http://localhost:3000/auth/login', {
        email,
        password
      });

      if (response.data.status) {
        navigate('/');
      }
    } catch (err) {
      setError('Error occurred, please try again later');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[rgba(0,49,53,0.5)] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#AFDDE5]">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="email" className="w-32 text-lg font-medium text-[#AFDDE5]">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-[#0FA4AF] focus:border-[#0FA4AF] sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="password" className="w-32 text-xl font-medium text-[#AFDDE5]">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-[#0FA4AF] focus:border-[#0FA4AF] sm:text-sm"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#003135] text-[#AFDDE5] py-2 rounded-md hover:bg-[#024950] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0FA4AF]"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-[#3a565b]">Don't have an account?</p>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-[#003135] hover:underline"
            >
              SignUp
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}
