import { useSelector } from "react-redux";
import { HashRouter as Router, Link } from 'react-router-dom';

function MovieItemDetails() {

    const reduxStore = useSelector(store => store)
    const { selectedMovie, selectedGenre } = reduxStore;
    const movie = selectedMovie;
    const genres = selectedGenre;

    return(
        <>
            {/* {JSON.stringify(genres)} */}
            {/* {JSON.stringify(movie)} */}
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
            <h3>Description:</h3>
            <p>{movie.description}</p>
            <h3>Genres:</h3>
            {genres.map(genre => (
                <li>{genre}</li>
            ))} <br />
            <Router>
                <Link to="/">Back</Link>
            </Router>
        </>
    )
}

export default MovieItemDetails;