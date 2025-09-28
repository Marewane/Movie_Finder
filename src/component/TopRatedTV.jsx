import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "./Movie"; // Reuse this if it works for TV shows too

export default function TopRatedTV() {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTopRatedTV = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`,
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

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth mt-[20px]">
        {shows.results
          ? shows.results.map((show) => (
              <Movie key={show.id} movie={show} />
            ))
          : "loading ..."}
      </div>
    </>
  );
}
