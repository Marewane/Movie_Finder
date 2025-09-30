import React, { useState, useEffect } from 'react';

const MovieSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResults = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      // Filter only movies and tv shows
      const filtered = (data.results || []).filter(
        (item) => item.media_type === 'movie' || item.media_type === 'tv'
      );
      setResults(filtered);
    } catch (e) {
      setResults([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchResults(searchQuery);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-gray-50">
      {/* Search input */}
      <div className="flex justify-center mt-10">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for movies or TV shows..."
          className="border border-gray-300 rounded-lg px-5 py-3 w-full max-w-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <div className="flex-1">
        <div className="container mx-auto px-4 py-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <span className="text-lg text-gray-600">Loading...</span>
            </div>
          ) : (
            <div>
              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                  {results.map((item) => (
                    <div
                      key={item.id + item.media_type}
                      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition hover:scale-105 hover:shadow-2xl duration-200"
                    >
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
                        }
                        alt={item.title || item.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="flex flex-col flex-1 p-4">
                        <h3 className="text-lg font-bold mb-1 truncate">
                          {item.title || item.name}
                        </h3>
                        <span className="text-xs text-blue-600 font-semibold mb-2">
                          {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
                        </span>
                        <p className="text-sm text-gray-600 flex-1 mb-2 line-clamp-4">
                          {item.overview ? item.overview : 'No description available.'}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          {item.release_date || item.first_air_date ? (
                            <span className="text-xs text-gray-400">
                              {item.release_date || item.first_air_date}
                            </span>
                          ) : null}
                          {item.vote_average ? (
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                              ⭐ {item.vote_average}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-40">
                  <span className="text-gray-500">No results found</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieSearchPage;