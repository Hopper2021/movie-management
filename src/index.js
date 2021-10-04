import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies); // GET all movies from database
    yield takeEvery('FETCH_GENRES', fetchAllGenres); // GET all genres from database
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails); // GET movie details when movie is clicked on in MovieList
    yield takeEvery('FETCH_GENRE_DETAILS', fetchGenreDetails); // Get genre details when movie is clicked on in MovieList
    yield takeEvery('POST_NEW_MOVIE', postNewMovie); // Create new Movie from Add Movie Page.
}

// Stores the Movie id, title, poster and description
// based on the movie id provided to fetchMovieDetails
// This reducer is used in MovieItemDetails
const selectedMovie = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;          
        default:
            return state;
    }
};

// Stores the genres associated with the movie id
// provided to fetchGenreDetails
// This reducer is used in MovieItemDetails
const selectedGenre = (state = {}, action) => {
    switch(action.type) {
        case 'SET_GENRE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Pulls back all movies from movies table
function* fetchAllMovies() {
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('Unable to fetch all the movies!');
    }
}

// Pulls back all genres from genres table
function* fetchAllGenres() {
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all genres: ', genres.data );
        yield put({ type: 'SET_GENRES', payload: genres.data })
    } catch (error) {
        console.log('Error in fetch All Genres: ', error);
        alert('Unable to fetch all the genres!')
    }
}

// Action contains all movie details, the movie id is used to pull
// back all associated information from movies table in the server
// which is id, title, poster, and description. This is then sent 
// to the selectedMovie reducer
function* fetchMovieDetails(action) {
    try {
        const movie = action.payload;
        console.log('fetchMovieDetails action, MOVIE:', movie.id );
        const movieDetails = yield axios.get(`/api/movie/details/${movie.id}`)
        console.log('What is movieDetails? - ', movieDetails );
        yield put({ type: 'SET_MOVIE_DETAILS', payload: movieDetails.data })
    } catch (error) {
        console.log('Error in fetching Movie details: ', error);
        alert('Unable to fetch movie details, Sorry!');
    }
}

// Action contains all movie details, the movie id is used to pull
// back all associated genres through table joins in the server
// the information pulled back is the name of all genres tied to the movie id
// that information is then sent to the selectedGenre reducer
function* fetchGenreDetails(action) {
    try {
        const movie = action.payload;
        const movieGenres = yield axios.get(`/api/genre/details/${movie.id}`)
        console.log('What is movieGenres? - ', movieGenres);
        yield put({ type: 'SET_GENRE_DETAILS', payload: movieGenres.data })
    } catch (error) {
        console.log('Error in fetching Genre Details in index: ', error);
        alert('Unable to fetch genre details, my bad!!')
    }
}

// Action is the compiled title, poster, genre, and description from 
// AddMovie page. That information is then posted to the server
function* postNewMovie(action) {
    try {
        const newMovie = action.payload;
        console.log('New Movie - ', newMovie);
        yield axios.post('/api/movie', newMovie)
        yield put({ type: 'FETCH_MOVIES' })
    } catch (error) {
        console.log('Error in postNewMovie - ', error);
        alert('Error in posting new movie.');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie,
        selectedGenre
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
