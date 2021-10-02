import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieListItem from '../MovieListItem/MovieListItem';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './MovieList.css'

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
            <Router>
                <Link to="/addMovie">Add New Movie</Link>
            </Router>
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