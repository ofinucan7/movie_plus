import React from 'react';
import { RiMovieFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#111] text-white px-6 py-4 shadow-md">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between">

        {/* Main logo */}
        <div onClick={() => navigate(isLoggedIn ? '/main' : '/')} className="flex items-center group cursor-pointer">
          <RiMovieFill size={30} className="text-[#3535df] group-hover:text-[#20207a] transition-colors duration-300"/>
          <h1 className="ml-2 text-2xl font-bold group-hover:text-[#20207a] transition-colors duration-300"> Movie+ </h1>
        </div>

        {/* Right side of header */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? ( 
            <div className='flex space-x-6'>
              {/* if the user is logged in, display the view profile, search, and logout buttons*/}
              <button onClick={() => navigate('/profile')} className="bg-[#3535df] hover:bg-[#20207a] text-white rounded-full px-5 py-2 font-medium transition"> View Profile </button>
              <button onClick={() => navigate('/search')} className="bg-[#3535df] hover:bg-[#20207a] text-white rounded-full px-5 py-2 font-medium transition"> Search </button>
              <button onClick={() => navigate('/')} className="bg-white hover:bg-gray-200 text-black rounded-full px-5 py-2 font-medium transition"> Logout </button>
            </div>
          ) : (
            <div>
              {/* if the user is not logged in, display only the login button */} 
              <button onClick={() => navigate('/login')} className="bg-white hover:bg-gray-200 text-black rounded-full px-5 py-2 font-medium transition"> Login </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;