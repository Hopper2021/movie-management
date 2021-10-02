import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieListItem from '../MovieListItem/MovieListItem';

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        console.log('Fetching the movies from MovieList!');
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {/* Testing to see if description is coming back, Success! */}
                {/* {JSON.stringify(movies)} */}
                {movies.map(movie => (
                    <MovieListItem key={movie.id} movie={movie}/>
                ))}
            </section>
        </main>

    );
}

export default MovieList;