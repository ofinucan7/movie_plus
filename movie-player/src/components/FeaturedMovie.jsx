import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedMovie = () => {
  
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[80vh] flex items-end overflow-hidden">
      {/* Background Video */}
      {/* Note: if the video does not play - display "Your browser..." message */}
      <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/movieTrailers/dune2.mp4" type="video/mp4" /> Your browser does not support the video tag.
      </video>

      {/* Gradients around the top (Hello, ___ section) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-10" />

      {/* Small back border around the edges of the player */}
      <div className="absolute left-0 top-0 h-full w-3 bg-black z-20"></div>
      <div className="absolute right-0 top-0 h-full w-3 bg-black z-20"></div>

      {/* "Movie of the week/featured movie trxt" */}
      <div className="relative z-30 p-10 text-white max-w-2xl">
          <p className="text-lg md:text-xl font-semibold text-gray-300 mb-2"> This Week's Featured Movie </p>
          <h1 className="text-4xl md:text-6xl font-bold"> Dune: Part Two </h1>
          
          <p className="mt-4 text-sm md:text-base text-gray-200">
            Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.
          </p>
          
          <button onClick={() => navigate('/search')} className="mt-6 px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"> Search for it? </button>
      </div>

    </div>

  );
};

export default FeaturedMovie;