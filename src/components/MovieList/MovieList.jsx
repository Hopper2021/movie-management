import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import  { useHistory } from 'react-router-dom';
import MovieListItem from '../MovieListItem/MovieListItem';

function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const moveToDetailPage = (movie) => {
        console.log('Movie in move to detail page: ', movie);
        dispatch({ type: 'SET_MOVIE_DETAILS', payload: movie })
        history.push('/details');
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {/* Testing to see if description is coming back, Success! */}
                {/* {JSON.stringify(movies)} */}
                {movies.map(movie => {
                    <div onClick={moveToDetailPage}>
                        <MovieListItem key={movie.id} movie={movie}/>
                    </div>
                })}
            </section>
        </main>

    );
}

export default MovieList;