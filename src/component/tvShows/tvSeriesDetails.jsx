import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TopBilledCast from "../persons/TopBilledCast";
import TopBilledCastTv from "./TopBilledCastTv";

export default function TvSeriesDetails(){
    const {series_id} = useParams();
    const [seriesDetails,setseriesDetails] = useState(null);
    const [personsInMovie,setPersonsInMovie] = useState([]);    
    console.log('this is persons in movies : ',personsInMovie);
    const [error,setError] = useState(null);
    

    function getFullYear(date){
        const dateReturned = new Date(date);
        return dateReturned.getFullYear();
    }
    


    useEffect(()=>{
        const fetchTvSeriesTopRated = async ()=>{
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}`,{
                headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type':'application/json'                
                    }
                });
                const resPerson = await axios.get(`https://api.themoviedb.org/3/tv/${series_id}/credits`,{
                headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type':'application/json'                
                    }
                });
                setPersonsInMovie(resPerson.data);
                setseriesDetails(res.data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchTvSeriesTopRated();
    },[series_id]);




    return (
        <>
            {error && <p className="text-red-500 text-5xl">Error: {error}</p>}
            {seriesDetails && (
            <section className="relative w-full  h-auto">
                {/* Backdrop with dark overlay */}
                <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${seriesDetails.backdrop_path})`,
                }}
                >
                    <div className="absolute inset-0 bg-black opacity-[0.9] "></div>
                </div>

                {/* Content (poster + info) on top */}
                <div className="relative z-10 flex gap-16  h-full p-6">
                    {/* this is poster image of  movie */}
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden w-[20%] h-[491px] ">
                        <img
                        src={`https://image.tmdb.org/t/p/w500/${seriesDetails.poster_path}`}
                        alt={seriesDetails.title}
                        className="w-full h-[100%]"
                        />
                    </div>
                    {/* add title, overview, etc. here next to the poster */}
                    <div className="w-[80%] text-white flex-wrap">
                        <h1 className="font-medium text-4xl">{seriesDetails.name} <span className="font-light">({getFullYear(seriesDetails.last_air_date)})</span></h1>
                        <div className="facts">
                            {/* released date */}
                            <span>{seriesDetails.release_date}</span>
                            {/* genres like comedy and actions and so on  */}
                            {
                                seriesDetails.genres.map((genre)=>(
                                    <span key={genre.id}>, {genre.name}</span>
                                ))
                            }
                        </div>

                        {/* this is overview  */}
                        <div className="overview mt-6">
                            <h4 className="font-medium text-[18px]">Overview</h4>
                            <p>{seriesDetails.overview}</p>
                        </div>

                        {/* this is characters whitout images */}
                        



                    </div>
                </div>
            </section>
            )}
            <TopBilledCastTv series_id={series_id}/>
        </>
        );
}