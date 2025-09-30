import axios from "axios";
import { useEffect, useState } from "react"

export default function TopBilledCast({movie_id}){
    console.log('this is movie id from TopBilledCast : ',movie_id);
    const [BilledCast,setBilledCast] = useState(null);
    console.log('this is BilledCast of this movie is : ',BilledCast)
    const [error,setError] = useState(false);

    useEffect(()=>{
        const fetchTopBilledCast = async ()=>{
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits`,{
                    headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type':'application/json'
                    }
                });
                setBilledCast(res.data);
            } catch (error) {
                setError(error.message)
            }
        }
        fetchTopBilledCast();
    },[movie_id]);
    return(
        <>
            <h3>Top Billed Cast : {movie_id} </h3>
            
        </>
    )
}