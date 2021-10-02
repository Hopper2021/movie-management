import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieItemDetails from '../MovieItemDetails/MovieItemDetails.jsx'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {/* Testing to see if description is coming back */}
                {/* {JSON.stringify(movies)} */}
                {movies.map(movie => {
                    return (
                        <MovieItemDetails key={movie.id} movie={movie}/>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;