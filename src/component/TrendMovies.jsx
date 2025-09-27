import axios from "axios";
import { useEffect, useState } from "react"
import Movie from "./Movie";

export default function Movies(){

    const [movies,setMovies] = useState([]);
    console.log('this is movies : ',movies);
    const [error,setError] = useState(false);
    const [selector,setSelector] = useState('day')

    useEffect(()=>{
        const fetchMovies = async ()=>{
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/trending/all/${selector}?language=en-US`,{
                    headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type':'application/json'
                    }
                });
                setMovies(res.data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchMovies();
    },[selector]);

    return(
        <>
            <h1 className="text-[30px]  inline-block">Trending Movies : </h1>
            {error && <h1 className="text-red-600">Error : {error}</h1>}
            

            <div className="selector_wraper text-center rounded-[40px] ml-[60px]  inline-flex border-[2px] border-solid border-[#032541] justify-evenly items-center w-[200px] h-[45px]">
                <div className={`anchor grow-1  h-[100%] leading-[42.78px] rounded-[40px] ${selector == 'day' && 'bg-[#032541] text-amber-50'}`}>
                    <button onClick={()=>{
                        setSelector('day')
                    }} className="cursor-pointer  w-[100%]">All</button>
                </div>
                <div className={`anchor grow-1  h-[100%] leading-[42.78px] rounded-[40px] ${selector == 'week' && 'bg-[#032541] text-amber-50'}`}>
                    <button onClick={()=>{
                        setSelector('week')
                    }} className="cursor-pointer w-[100%]">Week</button>
                </div>
            </div>


            <div className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth mt-[20px]">
                {
                movies.results ? movies.results.map((movie)=>(
                    
                    <Movie key={movie.id}  movie={movie} />
                )) : 'loading ...'
            }
            </div>
            
        </>
    )
}