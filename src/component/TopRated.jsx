import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "./Movie"; // Reuse your existing card component

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

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth mt-[20px]">
        {topRated.results
          ? topRated.results.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))
          : "loading ..."}
      </div>
    </>
  );
}
