import { useSelector } from "react-redux";
import { HashRouter as Router, Link } from 'react-router-dom';

function MovieItemDetails() {

    const movie = useSelector(store => store.selectedMovie)

    return(
        <>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
            <p>{movie.description}</p>
            <Router>
                <Link to="/">Back</Link>
            </Router>
        </>
    )
}

export default MovieItemDetails;