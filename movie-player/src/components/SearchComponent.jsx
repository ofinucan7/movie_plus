import React, { useState } from 'react';

const TMDB_API_KEY = 'd4d2867677ee2fe04c50495d146645ea';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Error searching TMDB:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3535df] via-black to-indigo-800 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Search Movies</h1>

      {/* search button */}
      <form onSubmit={handleSearch} className="flex justify-center mb-10">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title..." className="w-full max-w-md px-4 py-2 rounded-l text-black"/>
        <button type="submit" className="bg-[#3535df] hover:bg-[#20207a] px-6 py-2 rounded-r font-semibold transition"> Search </button>
      </form>

      {/* movie info */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((movie) => (
          <div key={movie.id} className="bg-[#111] p-4 rounded-lg shadow hover:scale-105 transition-transform">
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'} alt={movie.title} className="rounded mb-3 w-full h-[400px] object-cover"/>
            <h2 className="text-lg font-semibold mb-1">{movie.title}</h2>
            <p className="text-sm text-gray-400 mb-1"> {movie.release_date || 'Unknown Release Date'} </p>
            <p className="text-sm text-gray-300 line-clamp-4"> {movie.overview || 'No description available.'} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
