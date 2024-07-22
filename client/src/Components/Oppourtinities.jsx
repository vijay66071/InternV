import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import opportunityData from '../assets/opportunities.json';

const Oppourtinities = () => {
  const [appliedOpp, setAppliedOpp] = useState([]);

  useEffect(() => {
    fetchAppliedOpportunity();
  }, []);

  const fetchAppliedOpportunity = async () => {
    try {
      const res = await axios.get('https://internv.onrender.com/auth/all-opportunity');
      setAppliedOpp(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#003135]">Internship Opportunities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.keys(opportunityData.internships_meta).map(key => {
          const opportunity = opportunityData.internships_meta[key];
          return (
            <OpportunityCard key={key} opportunity={opportunity} appliedOpp={appliedOpp} />
          );
        })}
      </div>
    </div>
  );
};

const OpportunityCard = ({ opportunity, appliedOpp }) => {
  const navigate = useNavigate();
  const {
    id,
    profile_name,
    stipend = {},
    company_name,
    start_date,
    locations = [],
    duration
  } = opportunity;

  const isApplied = Array.isArray(appliedOpp) && appliedOpp.some(item => item.id === id);

  const applyForOpportunity = async (opportunity) => {
    try {
      await axios.post('https://internv.onrender.com/auth/apply', { opportunity })
        .then(res => console.log(res));
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#848b8c]  shadow-lg rounded-lg p-6 flex flex-col backdrop-blur-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-2 text-[#003135]">{profile_name}</h2>
      <p className="text-sm mb-2 text-gray-700"><strong>Company:</strong> {company_name}</p>
      <p className="text-sm mb-2 text-gray-700"><strong>Stipend:</strong> {stipend.salary || 'N/A'}</p>
      <p className="text-sm mb-2 text-gray-700"><strong>Location:</strong> {locations.map(l => l.string).join(', ')}</p>
      <p className="text-sm mb-2 text-gray-700"><strong>Duration:</strong> {duration}</p>
      <p className="text-sm mb-4 text-gray-700"><strong>Start Date:</strong> {start_date}</p>
      <div className="mt-auto">
        {isApplied ? (
          <button disabled className="w-full bg-gray-400 text-white py-2 rounded-md cursor-not-allowed">
            Applied
          </button>
        ) : (
          <button
            onClick={() => applyForOpportunity(opportunity)}
            className="w-full bg-[#003135] text-white py-2 rounded-md hover:bg-[#024950] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#024950]"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Oppourtinities;
