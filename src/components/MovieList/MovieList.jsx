import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieItemDetails from '../MovieItemDetails/MovieItemDetails.jsx'
import  { useHistory } from 'react-router-dom';

function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const moveToDetailPage = () => {
        history.push('/details');
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {/* Testing to see if description is coming back, Success! */}
                {/* {JSON.stringify(movies)} */}
                {movies.map(movie => {
                    return (
                        <MovieItemDetails key={movie.id} movie={movie}
                        onClick={moveToDetailPage}
                        />
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;