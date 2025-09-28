import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "./Movie";

export default function TVShows() {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(false);
  const [selector, setSelector] = useState("day");

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/${selector}?language=en-US`,
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
    fetchTVShows();
  }, [selector]);

  return (
    <>
      <h1 className="text-[30px] inline-block">Trending TV Shows :</h1>
      {error && <h1 className="text-red-600">Error : {error}</h1>}

      <div className="selector_wraper text-center rounded-[40px] ml-[60px] inline-flex border-[2px] border-solid border-[#032541] justify-evenly items-center w-[200px] h-[45px]">
        <div
          className={`anchor grow-1 h-[100%] leading-[42.78px] rounded-[40px] ${
            selector === "day" && "bg-[#032541] text-amber-50"
          }`}
        >
          <button onClick={() => setSelector("day")} className="cursor-pointer w-[100%]">
            All
          </button>
        </div>
        <div
          className={`anchor grow-1 h-[100%] leading-[42.78px] rounded-[40px] ${
            selector === "week" && "bg-[#032541] text-amber-50"
          }`}
        >
          <button onClick={() => setSelector("week")} className="cursor-pointer w-[100%]">
            Week
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-2 mt-[20px]">
        {shows.results
          ? shows.results.map((show) => (
              <div key={show.id} className="min-w-[200px] flex-shrink-0">
                <Movie movie={show} />
              </div>
            ))
          : Array.from({length: 12}).map((_, index) => (
              <div key={index} className="min-w-[200px] bg-gray-300 animate-pulse rounded-lg flex-shrink-0">
                <div className="w-full h-72 bg-gray-400 rounded-t-lg"></div>
                <div className="p-2">
                  <div className="h-4 bg-gray-400 rounded mb-2"></div>
                  <div className="h-3 bg-gray-400 rounded w-3/4"></div>
                </div>
              </div>
            ))
        }
      </div>
    </>
  );
}
