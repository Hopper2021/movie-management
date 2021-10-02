function MovieListItem({movie}) {

    return(
        <>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
        </>
    )
}

export default MovieListItem;