import { useDispatch } from 'react-redux';
import  { useHistory } from 'react-router-dom';

function MovieListItem({movie}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const moveToDetailPage = () => {
        console.log('Movie in Movie List Item detail page function: ', movie );
        dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: movie })
        dispatch({ type: 'FETCH_GENRE_DETAILS', payload: movie })
        history.push('/details');
    }

    return(
        <div onClick={moveToDetailPage}>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
        </div>
    )
}

export default MovieListItem;