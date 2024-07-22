import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState(null);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setErr("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('age', age);
    formData.append('dateOfBirth', dob);
    if (image) {
      formData.append('image', image);
    }

    try {
      await Axios.post('https://internv.onrender.com/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.status)
          navigate('/login');
      });
    } catch (e) {
      setErr("Internal error occurred...");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[rgba(0,49,53,0.5)] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#AFDDE5]">SignUp</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-32 text-xl font-medium text-[#AFDDE5]">Username:</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username.."
              className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#0FA4AF] focus:border-[#0FA4AF] sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 text-xl font-medium text-[#AFDDE5]">Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email.."
              className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#0FA4AF] focus:border-[#0FA4AF] sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 text-xl font-medium text-[#AFDDE5]">Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password.."
              className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#0FA4AF] focus:border-[#0FA4AF] sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 text-xl font-medium text-[#AFDDE5]">Age:</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="Age.."
              className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#0FA4AF] focus:border-[#0FA4AF] sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 text-xl font-medium text-[#AFDDE5]">Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="flex-1 px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-[#0FA4AF] focus:border sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-32 text-xl font-medium text-[#AFDDE5]">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              className="flex-1 text-sm text-[#033139]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#003135] text-[#AFDDE5] py-2 rounded-md hover:bg-[#024950] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0FA4AF]"
          >
            SignUp
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-[#3a565b]">Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#AFDDE] text-[#003135] hover:underline"
            >
              Login
            </button>
          </div>
          {err && <p className="text-red-500 text-center mt-4">{err}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
