import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({
    username: '',
    email: '',
    age: '',
    dateOfBirth: '',
    pic: { url: '' }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isPersonalDetailsOpen, setIsPersonalDetailsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://internv.onrender.com/auth/verify').then(res => {
      if (!res.data.status)
        navigate('/login');
      else {
        fetchAppliedOpportunity();
        fetchPersonalDetails();
      }
    });
  }, [navigate]);

  const fetchAppliedOpportunity = async () => {
    try {
      const res = await axios.get('https://internv.onrender.com/auth/applied-opportunity');
      setData(res.data);
    } catch (error) {
      console.error("Error fetching applied opportunities:", error);
    }
  };

  const fetchPersonalDetails = async () => {
    try {
      const res = await axios.get('https://internv.onrender.com/auth/personal-details');
      setPersonalDetails(res.data);
    } catch (error) {
      console.error("Error fetching personal details:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://internv.onrender.com/auth/update-personal-details', personalDetails);
      if (res.data.status) {
        setPersonalDetails(res.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating personal details:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('https://internv.onrender.com/auth/logout');
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 sm:px-6 sm:py-16 lg:px-8 lg:py-16 relative">
  {/* Navbar */}
  <Navbar />
  
  {/* Dropdown Button */}
  <div className="absolute top-14 right-4 z-10">
    <button
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="bg-[#024950] text-[#AFDDE5] px-6 py-2 rounded-lg shadow-md hover:bg-[#062d30] focus:outline-none focus:ring-2  "
    >
      Menu
    </button>
    {isDropdownOpen && (
      <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-48">
        <button
          onClick={() => {
            setIsPersonalDetailsOpen(!isPersonalDetailsOpen);
            setIsDropdownOpen(false);
          }}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-b border-gray-300 w-full text-left"
        >
          Profile
        </button>
        <button
          onClick={() => {
            handleLogout();
            setIsDropdownOpen(false);
          }}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Logout
        </button>
      </div>
    )}
  </div>

  {/* Overlay Effect */}
  {isPersonalDetailsOpen && (
    <>
      <div className="fixed inset-0 bg-[#003135] bg-opacity-50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white bg-opacity-60 backdrop-blur-md shadow-lg rounded-lg p-8 max-w-md mx-4 w-full relative">
          {isEditing ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  {personalDetails.pic.url && (
                    <img src={personalDetails.pic.url} alt="Profile" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="w-full">
                  <div className="flex items-center mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-[#003135] w-1/3">Name:</label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={personalDetails.username}
                      onChange={handleInputChange}
                      className="mt-1 block w-2/3 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#0FA4AF] focus:border-[#0FA4AF]"
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-[#003135] w-1/3">Email:</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={personalDetails.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-2/3 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#0FA4AF] focus:border-[#0FA4AF]"
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <label htmlFor="age" className="block text-sm font-medium text-[#003135] w-1/3">Age:</label>
                    <input
                      id="age"
                      type="number"
                      name="age"
                      value={personalDetails.age}
                      onChange={handleInputChange}
                      className="mt-1 block w-2/3 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#0FA4AF] focus:border-[#0FA4AF]"
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-[#003135] w-1/3">Date of Birth:</label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      name="dateOfBirth"
                      value={personalDetails.dateOfBirth}
                      onChange={handleInputChange}
                      className="mt-1 block w-2/3 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#0FA4AF] focus:border-[#0FA4AF]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#003135] text-[#AFDDE5] px-4 py-2 rounded-md hover:bg-[#024950]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 mx-auto">
                {personalDetails.pic.url && (
                  <img src={personalDetails.pic.url} alt="Profile" className="w-full h-full object-cover" />
                )}
              </div>
              <p className="text-sm mb-2"><strong>Name:</strong> {personalDetails.username}</p>
              <p className="text-sm mb-2"><strong>Email:</strong> {personalDetails.email}</p>
              <p className="text-sm mb-2"><strong>Age:</strong> {personalDetails.age}</p>
              <p className="text-sm mb-4"><strong>Date of Birth:</strong> {personalDetails.dateOfBirth}</p>
              <button
                onClick={handleEditToggle}
                className="bg-[#003135] text-[#AFDDE5] px-4 py-2 rounded-md hover:bg-[#024950]"
              >
                Edit
              </button>
            </div>
          )}
          {!isEditing && (
            <button
              onClick={() => setIsPersonalDetailsOpen(false)}
              className="absolute top-4 right-4 bg-[#053b3b] text-white px-4 py-2 rounded-md hover:bg-[#085e66]"
            >
              Hide
            </button>
          )}
        </div>
      </div>
  </div>
    </>
  )}


             {/* Applied Opportunities */}
            <h2 className="text-2xl font-bold mb-6 text-[#003135]">Applied Opportunities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
              {data.map((opportunity, index) => (
            <div
              key={index}
              className="bg-[#848b8c] bg-opacity-60 shadow-md rounded-lg p-6 backdrop-blur-md border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-[#003135]"><b>Profile:</b> {opportunity.profile_name}</h3>
              <p className="text-sm mb-2 text-gray-700"><strong>Company:</strong> {opportunity.company_name}</p>
              <p className="text-sm mb-2 text-gray-700"><strong>Salary:</strong> {opportunity.stipend}</p>
              <p className="text-sm mb-2 text-gray-700"><strong>Time-span:</strong> {opportunity.duration}</p>
              <p className="text-sm mb-2 text-gray-700"><strong>Applier:</strong> {opportunity.userId}</p>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Dashboard;
