import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "./Movie";

export default function TopRated() {
  const [topRated, setTopRated] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTopRated(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTopRated();
  }, []);

  return (
    <>
      <h1 className="text-[30px] inline-block">Top Rated Movies :</h1>
      {error && <h1 className="text-red-600">Error : {error}</h1>}

      <div className="flex overflow-x-auto gap-4 pb-2">
        {topRated.results
          ? topRated.results.map((movie) => (
              <div key={movie.id} className="min-w-[200px] flex-shrink-0">
                <Movie movie={movie} />
              </div>
            ))
          : Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="min-w-[200px] bg-gray-300 animate-pulse rounded-lg flex-shrink-0"
              >
                <div className="w-full h-72 bg-gray-400 rounded-t-lg"></div>
                <div className="p-2">
                  <div className="h-4 bg-gray-400 rounded mb-2"></div>
                  <div className="h-3 bg-gray-400 rounded w-3/4"></div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}
