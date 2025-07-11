import React from 'react'
import { useNavigate } from 'react-router-dom';

const MainFooter = () => {
  
  const navigate = useNavigate();
  
  return (
    <div className="bg-black text-white py-6 px-4 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
      <p className="text-lg text-center"> Not finding what you're looking for? Search for it! </p>
      <button onClick={() => navigate('/search')} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition font-semibold"> Search </button>
    </div>
  )
}

export default MainFooter