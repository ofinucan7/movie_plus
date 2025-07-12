const API_KEY = 'd4d2867677ee2fe04c50495d146645ea'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = async (category = 'popular') => {
  const url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};
