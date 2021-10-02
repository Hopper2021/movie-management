function MovieItemDetails({movie}) {

    return(
        <>
            <div>
                <h3>{movie.title}</h3>
                <img src={movie.poster} alt={movie.title}/>
            </div>
        </>
    )
}

export default MovieItemDetails;