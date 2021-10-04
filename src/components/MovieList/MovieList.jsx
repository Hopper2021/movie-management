import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieListItem from '../MovieListItem/MovieListItem';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './MovieList.css'

function MovieList() {
    const dispatch = useDispatch();
    /* useSelector allows us to use the ReduxStore to share the info stored in reduxStore */
    const reduxStore = useSelector(store => store);
    const { movies } = reduxStore;

    /* useEffect bring all movies to the Movie List page on page load */
    useEffect(() => {
        console.log('Fetching the movies and genres from MovieList!');
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            {/* Router and Link to Add Movie Page */}
            <Router>
                <Link to="/addMovie">Add New Movie</Link>
            </Router>
            {/* Mapped through movies reducer brought through the reduxStore */}
            <section className="movies">
                {movies.map(movie => (
                    <MovieListItem key={movie.id} movie={movie}/>
                ))}
            </section>
        </main>

    );
}

export default MovieList;