import { useSelector } from "react-redux";
import { HashRouter as Router, Link } from 'react-router-dom';

function MovieItemDetails() {

    const reduxStore = useSelector(store => store)
    /* Desconstruct reducers from the reduxStore */
    const { selectedMovie, selectedGenre } = reduxStore;
    /* Define those reducers */
    const movie = selectedMovie;
    const genres = selectedGenre;

    return(
        <>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
            <h3>Description:</h3>
                <p>{movie.description}</p>
            <h3>Genres:</h3>
                {/* genres is mapped through in case there are multiples
                    associated with the movie id provided */}
                {[genres].map(genre => (
                    <li>{genre}</li>
                ))} <br />
            {/* Link to home page */}
            <Router>
                <Link to="/">Back</Link>
            </Router>
        </>
    )
}

export default MovieItemDetails;