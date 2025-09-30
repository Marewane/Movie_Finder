import axios from "axios";
import { useEffect, useState } from "react"

export default function TopBilledCast({movie_id}){
    const [BilledCast,setBilledCast] = useState(null);
    const [movieDetails,setMovieDetails] = useState({});
    const firstBilledCast = BilledCast && BilledCast.cast.slice(0,13);
    const budget = movieDetails.budget;
    const revenue = movieDetails.revenue;
    const formattedBudget =budget && budget.toLocaleString();
    const formattedRevenue =revenue && revenue.toLocaleString();
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchBilledCast = async ()=>{
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits`,{
                    headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type':'application/json'
                    }
                })
                setBilledCast(res.data);
            } catch (error) {
                setError(error.message)
            }
        };

        const fetchMovieDetails = async ()=>{
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`,{
                    headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type' : 'application/json'
                    }
                });
                setMovieDetails(res.data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchMovieDetails();
        fetchBilledCast();
    },[movie_id])
    return(
        <div className="profile_top_cast my-7 ">
            <h3 className="font-bold text-[30px] mx-7">Top Billed Cast : </h3>

            {error && <h1 className="font-light text-3xl text-red-600">{error}</h1>}
            {/* this is the part of topBilledCast and details about movie */}
            <div className="flex ">
                <div id="cast_scroller" className="overflow-x-auto mx-7 my-3.5 w-[70%]">
                    <ol className="flex gap-4 w-max">
                        {firstBilledCast ? firstBilledCast.map((cast) => (
                        <li key={cast.id} className="w-[180px]  border border-solid border-[#ddd] flex-shrink-0">
                            <img 
                            src={`https://image.tmdb.org/t/p/w154/${cast.profile_path}`} 
                            alt="profile path" 
                            className="w-full h-[200px] object-cover" 
                            />
                            <div className="profile_content p-2.5 ">
                                <h3 className="font-bold mt-1">{cast.name}</h3>
                                <p> {cast.character} </p>
                            </div>
                        </li>
                        )) : 'Loading ...'}
                    </ol>
                </div>
                {
                    movieDetails ? 
                    <div id="movie_infos" style={{boxShadow: '-30px 0 74px 44px white' }} className="w-[30%] border-none  p-4">
                        <div className="my-3.5">
                            <h3 className="font-bold text-[17px]">Status </h3>
                            {movieDetails.status}
                        </div>
                        <div className="my-3.5">
                            <h3 className="font-bold text-[17px]">Original Language </h3>
                            {movieDetails.original_language == 'en' ? 'english' : movieDetails.original_language}
                        </div>
                        <div className="my-3.5">
                            <h3 className="font-bold text-[17px]">Budget </h3>
                            ${formattedBudget}
                        </div>
                        <div className="my-3.5">
                            <h3 className="font-bold text-[17px]">Revenue </h3>
                            ${formattedRevenue}
                        </div>
                    </div>
                    : 'Loading ...'
                }
            </div>


        </div>
    )
}