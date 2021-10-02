import { useDispatch, useSelector } from 'react-redux';
import  { useHistory } from 'react-router-dom';

function MovieListItem({movie}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const moveToDetailPage = (movie) => {
        console.log('Movie in Movie List Item detail page function: ', movie );
        dispatch({ type: 'SET_MOVIE_DETAILS', payload: movie })
        history.push('/details');
    }

    return(
        // Using the onClick anonymous function here helps 'movie'
        // keep its scope. Without the anon function, movie will
        // appear as SyntheticEvent, which we don't want!
        <div onClick={() => moveToDetailPage(movie)}>
            {JSON.stringify(movie)}
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
        </div>
    )
}

export default MovieListItem;