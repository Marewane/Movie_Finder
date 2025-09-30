import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../movies/Movie.jsx";

export default function TopRatedTV() {
  const [shows, setShows] = useState([]);
  console.log('this is tvShows : ',shows);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTopRatedTV = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        setShows(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTopRatedTV();
  }, []);

  return (
    <>
      <h1 className="text-[30px] inline-block">Top Rated TV Shows :</h1>
      {error && <h1 className="text-red-600">Error : {error}</h1>}

      <div className="flex overflow-x-auto gap-4 pb-2">
        {shows.results
          ? shows.results.map((show) => (
              <div key={show.id} className="min-w-[200px] flex-shrink-0">
               <Link to={`/tv-shows/${show.id}`}>
                 <Movie movie={show} />
               </Link>
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
