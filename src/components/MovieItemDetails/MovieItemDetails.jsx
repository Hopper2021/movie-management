import { useSelector } from "react-redux";

function MovieItemDetails() {

    const movie = useSelector(store => store.selectedMovie)

    return(
        <>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
            <p>{movie.description}</p>
        </>
    )
}

export default MovieItemDetails;