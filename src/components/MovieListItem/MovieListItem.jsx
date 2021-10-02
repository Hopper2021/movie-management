import { useDispatch, useSelector } from 'react-redux';
import  { useHistory } from 'react-router-dom';

function MovieListItem({movie}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const moveToDetailPage = (movie) => {
        console.log('Movie in move to detail page: ', movie );
        dispatch({ type: 'SET_MOVIE_DETAILS', payload: movie })
        history.push('/details');
    }

    return(
        <div onClick={moveToDetailPage}>
            {JSON.stringify(movie)}
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
        </div>
    )
}

export default MovieListItem;