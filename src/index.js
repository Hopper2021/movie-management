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
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('SET_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('SET_GENRE_DETAILS', fetchGenreDetails);
}

const selectedMovie = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;          
        default:
            return state;
    }
};

// const defaultSelectedGenre = {
//     movie_id: '',
//     genres: ''
// }
const selectedGenre = (state = {}, action) => {
    switch(action.type) {
        case 'SET_GENRE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('Unable to fetch all the movies!');
    }
}

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

function* fetchMovieDetails(action) {
    try {
        const movie = action.payload;
        console.log('fetchMovieDetails action, MOVIE:', movie.id );
        yield axios.get(`/api/movie/details/${movie.id}`)
        yield put({ type: 'SET_MOVIE_DETAILS', payload: movie.data })
    } catch (error) {
        console.log('Error in fetching Movie details: ', error);
        alert('Unable to fetch movie details, Sorry!');
    }
}

function* fetchGenreDetails(action) {
    try {
        const movie = action.payload;
        const movieGenres = yield axios.get(`/api/genre/details/${movie.id}`)
        yield put({ type: 'SET_GENRE_DETAILS', payload: movieGenres.data })
    } catch (error) {
        console.log('Error in fetching Genre Details in index: ', error);
        alert('Unable to fetch genre details, my bad!!')
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
