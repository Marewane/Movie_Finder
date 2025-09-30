export default function Movie({movie}){
    let date = new Date(movie.release_date || movie.first_air_date);
    let formattedDate = date.toLocaleDateString('en-US',{
        month:'short',
        day:'2-digit',
        year:'numeric'
    })
    return(
        <>
        <div key={movie.id} className="min-w-[200px] bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg flex-shrink-0">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster path" className="w-full h-72 object-cover" />
            <div className="p-2">
                <h2 className="text-sm font-semibold truncate">{movie.title ? movie.title : movie.name}</h2>
                <p className="text-xs opacity-70">{formattedDate}</p>
            </div>
        </div>
            
        </>
    )
}