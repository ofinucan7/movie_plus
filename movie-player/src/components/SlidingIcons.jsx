import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const TMDB_API_KEY = "d4d2867677ee2fe04c50495d146645ea";

const SlidingIcons = ({ section_message, category = 'popular', img_height }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // responsive scaling
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 3 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 3 },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
      const data = await res.json();
      setMovies(data.results || []);
    };
    fetchMovies();
  }, [category]);

  const handleClick = async (movie) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}`);
    const fullMovie = await res.json();
    setSelectedMovie(fullMovie);
  };

  const closeModal = () => setSelectedMovie(null);

  return (
    <div className="bg-black py-4 px-4 text-white relative">
      <h1 className="text-2xl font-bold ml-5 mb-3">{section_message}</h1>
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000} transitionDuration={700} partialVisible arrows={false} itemClass="px-2">
        {movies.map((movie) => (
          <div key={movie.id} className="cursor-pointer" onClick={() => handleClick(movie)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-xl object-cover w-full" style={{ height: `${img_height || 175}px` }}/>
          </div>
        ))}
      </Carousel>

      {/* clicked movie popup */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div className="relative bg-[#111] p-5 rounded-xl max-w-md w-full text-white shadow-lg max-h-[80vh] overflow-y-auto">
            <button className="absolute top-2 right-3 text-white text-xl hover:text-red-400 transition" onClick={closeModal}> X </button>
            <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} className="rounded mb-3 mx-auto max-h-60 object-contain"/>
            <h2 className="text-xl font-bold mb-2 text-center">{selectedMovie.title}</h2>
            <p className="text-sm text-gray-300 mb-1 text-center"> <strong> Runtime: </strong> {selectedMovie.runtime ? `${selectedMovie.runtime} mins` : '—'} </p>
            <p className="text-sm text-gray-400 mt-2">{selectedMovie.overview || 'No summary available.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlidingIcons;