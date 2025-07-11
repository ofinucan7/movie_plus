import React from 'react';
import { useNavigate } from 'react-router-dom';

const PricingButtons = () => {

  const navigate = useNavigate();
  const handleJoin = () => {
    navigate('/join');
  };

  return (
    <div id="plans" className="w-full pt-[8rem] pb-[6rem] px-4 bg-gradient-to-b from-[#272727] via-[#777777] to-[#222]">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch">
        
        {/* Student plan */}
        <div className="flex flex-col w-full md:w-1/3 shadow-xl p-6 rounded-2xl hover:scale-[1.02] duration-300 border border-gray-400 bg-[#111]">
          <h1 className="text-2xl font-bold text-center py-6 text-white">Student Plan</h1>
          <p className="text-center text-4xl font-bold text-white">$8.99 per month</p>
          <div className="flex-1 text-center font-medium text-gray-300 mt-6">
            <p className="py-2 border-b border-gray-700 mx-8"> Never any ads </p>
            <p className="py-2 border-b border-gray-700 mx-8"> Good quality </p>
            <p className="py-2 border-b border-gray-700 mx-8"> 1080p streaming capability </p>
          </div>
          <button onClick={handleJoin} className="mt-6 bg-[#3535df] text-white rounded-full font-semibold px-6 py-3 mx-auto transition hover:bg-[#20207a]"> Choose Student </button>
        </div>

        {/* Standard Plan */}
        <div className="flex flex-col w-full md:w-1/3 shadow-xl p-6 rounded-2xl hover:scale-[1.02] duration-300 border border-gray-400 bg-[#111]">
          <h2 className="text-2xl font-bold text-center py-6 text-white">Standard Plan</h2>
          <p className="text-center text-4xl font-bold text-white">$12.99 per month</p>
          <div className="flex-1 text-center font-medium text-gray-300 mt-6">
            <p className="py-2 border-b border-gray-700 mx-8"> Never any ads </p>
            <p className="py-2 border-b border-gray-700 mx-8"> Great quality </p>
            <p className="py-2 border-b border-gray-700 mx-8"> Streaming up to 1440p </p>
          </div>
          <button onClick={handleJoin} className="mt-6 bg-[#3535df] text-white rounded-full font-semibold px-6 py-3 mx-auto transition hover:bg-[#20207a]"> Choose Standard </button>
        </div>

        {/* Premium plan */}
        <div className="flex flex-col w-full md:w-1/3 shadow-xl p-6 rounded-2xl hover:scale-[1.02] duration-300 border border-gray-400 bg-[#111]">
          <h2 className="text-2xl font-bold text-center py-6 text-white">Premium Plan</h2>
          <p className="text-center text-4xl font-bold text-white">$17.99 per month</p>
          <div className="flex-1 text-center font-medium text-gray-300 mt-6">
            <p className="py-2 border-b border-gray-700 mx-8"> Never any ads </p>
            <p className="py-2 border-b border-gray-700 mx-8"> Amazing quality </p>
            <p className="py-2 border-b border-gray-700 mx-8"> Access to 4K + HDR streaming </p>
          </div>
          <button onClick={handleJoin} className="mt-6 bg-[#3535df] text-white rounded-full font-semibold px-6 py-3 mx-auto transition hover:bg-[#20207a]"> Choose Premium </button>
        </div>
        
      </div>
    </div>
  );
};

export default PricingButtons;
