import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import TopBilledCast from "../persons/TopBilledCast.jsx";

export default function MovieDetails(){
    const {movie_id} = useParams();
    const [movieDetails,setMovieDetails] = useState(null);
    
    const [personsInMovie,setPersonsInMovie] = useState([]);    
    const [error,setError] = useState(null);
    

    function getFullYear(date){
        const dateReturned = new Date(date);
        return dateReturned.getFullYear();
    }
    


    useEffect(()=>{
        const fetchMovieInfos = async ()=>{
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`,{
                headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type':'application/json'                
                    }
                });
                const resPerson = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits`,{
                headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type':'application/json'                
                    }
                });
                setPersonsInMovie(resPerson.data);
                setMovieDetails(res.data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchMovieInfos();
    },[movie_id]);




    return (
        <>
            {error && <p className="text-red-500 text-5xl">Error: {error}</p>}
            {movieDetails && (
            <section className="relative w-full  h-auto">
                {/* Backdrop with dark overlay */}
                <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
                }}
                >
                    <div className="absolute inset-0 bg-black opacity-[0.9] "></div>
                </div>

                {/* Content (poster + info) on top */}
                <div className="relative z-10 flex gap-16  h-full p-6">
                    {/* this is poster image of  movie */}
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden w-[25%] h-[491px] ">
                        <img
                        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                        className="w-full h-[100%]"
                        />
                    </div>
                    {/* add title, overview, etc. here next to the poster */}
                    <div className="w-[75%] text-white flex-wrap">
                        <h1 className="font-medium text-4xl">{movieDetails.original_title} <span className="font-light">({getFullYear(movieDetails.release_date)})</span></h1>
                        <div className="facts">
                            {/* released date */}
                            <span>{movieDetails.release_date}</span>
                            {/* genres like comedy and actions and so on  */}
                            {
                                movieDetails.genres.map((genre)=>(
                                    <span key={genre.id}>, {genre.name}</span>
                                ))
                            }
                        </div>

                        {/* this is overview  */}
                        <div className="overview mt-6">
                            <h4 className="font-medium text-[18px]">Overview</h4>
                            <p>{movieDetails.overview}</p>
                        </div>

                        {/* this is characters whitout images */}
                        <div className="character_no_picture mt-16">
                            <ol className="grid grid-cols-3 grid-rows-3    h-[300px]">
                                {
                                    personsInMovie.crew.filter((p)=>p.job == 'Director' || p.job == 'Characters' || p.job == 'Characters').map((p)=>(
                                        <li className="profile px-[20px] py-[10px]" key={p.id}>
                                            <p className='font-medium text-[19px]'>{p.name}</p>
                                            <p>{p.job}</p>
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>



                    </div>
                </div>
            </section>
            )}

            <TopBilledCast movie_id={movie_id}/>
        </>
        );
}