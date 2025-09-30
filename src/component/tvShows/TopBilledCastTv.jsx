import axios from "axios";
import { useEffect, useState } from "react"

export default function TopBilledCastTv({series_id}){
    const [BilledCastTv,setBilledCastTv] = useState(null);
    const [seriesDetails,setSeriesDetails] = useState({});
    console.log('this is seriesDetails networks : ',seriesDetails.networks);
    const firstBilledCastTv = BilledCastTv && BilledCastTv.cast.slice(0,13);
    // const budget = seriesDetails.budget;
    // const revenue = seriesDetails.revenue;
    // const formattedBudget =budget && budget.toLocaleString();
    // const formattedRevenue =revenue && revenue.toLocaleString();
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchBilledCast = async ()=>{
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}/credits`,{
                    headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type':'application/json'
                    }
                })
                setBilledCastTv(res.data);
            } catch (error) {
                setError(error.message)
            }
        };

        const fetchMovieDetails = async ()=>{
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}`,{
                    headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type' : 'application/json'
                    }
                });
                setSeriesDetails(res.data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchMovieDetails();
        fetchBilledCast();
    },[series_id])
    return(
        <div className="profile_top_cast my-7 ">
            <h3 className="font-bold text-[30px] mx-7">Top Billed Cast : </h3>

            {error && <h1 className="font-light text-3xl text-red-600">{error}</h1>}
            {/* this is the part of topBilledCast and details about movie */}
            <div className="flex ">
                <div id="cast_scroller" className="overflow-x-auto mx-7 my-3.5 w-[70%]">
                    <ol className="flex gap-4 w-max">
                        {firstBilledCastTv ? firstBilledCastTv.map((cast) => (
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
                    seriesDetails ? 
                    <div id="movie_infos" style={{boxShadow: '-30px 0 74px 44px white' }} className="w-[30%] border-none  p-4">
                        <div className="my-3.5">
                            <h3 className="font-bold text-[17px]">Status </h3>
                            {seriesDetails.status}
                        </div>
                        <div className="my-3.5">
                            <h3 className="font-bold text-[17px]">Original Language </h3>
                            {seriesDetails.original_language == 'en' ? 'english' : seriesDetails.original_language}
                        </div>
                        <div className="my-3.5">
                            <h3 className="font-bold text-[17px]">Network </h3>
                            <div id="networks_tvShows" className=" w-full flex flex-wrap gap-5">
                                {
                                    seriesDetails.networks && seriesDetails.networks.map((network)=>(
                                        <img key={network.id} src={`https://image.tmdb.org/t/p/w92/${network.logo_path}`} alt="logo network" />
                                    ))
                                }
                            </div>

                            
                        </div>
                        <div className="my-3.5">
                            <h3 className="font-bold text-[17px]">Type </h3>
                            {seriesDetails.type}
                        </div>
                    </div>
                    : 'Loading ...'
                }
            </div>


        </div>
    )
}