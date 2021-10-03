import { HashRouter as Router, Route, Link } from 'react-router-dom';
import React, { useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { useHistory } from 'react-router-dom';

function AddMovie() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres)

    let [newMovie, setNewMovie] = useState(
        { title: '', poster: '', description: '', genre: '' }
    );
    
    const handleTitleChange = (event) => {
        setNewMovie({...newMovie, title: event.target.value});
    }

    const handlePosterChange = (event) => {
        setNewMovie({...newMovie, poster: event.target.value});
    }

    const handleDescriptionChange = (event) => {
        setNewMovie({...newMovie, description: event.target.value});
    }

    const handleGenreChange = (event) => {
        setNewMovie({...newMovie, genre: event.target.value});
    }

    const addNewMovie = (event) => {
        event.preventDefault();
        dispatch({ type: 'POST_NEW_MOVIE', payload: newMovie });
        setNewMovie({ title: '', poster: '', description: '', genre: '' });
        console.log('This is the new movie - ', newMovie);
        history.push('/');
    }

    return(
        <>
            <form onSubmit={addNewMovie}>
                <input required
                    placeholder="Title"
                    value={newMovie.title}
                    onChange={handleTitleChange}/><br />
                <input required
                    placeholder="Poster Image"
                    value={newMovie.poster}
                    onChange={handlePosterChange}/><br /><br /> 
                <label for="genres">Choose a genre</label><br />
                {/* {JSON.stringify(genres)}<br /> */}
                <select id="genres" name="genres" label="genres"
                    onSelect={handleGenreChange}>
                    {genres.map(({name}) => (
                        <option value={name}>{name}</option>
                    ))}
                    {/* <option value="Adventure">Adventure</option>
                    <option value="Animated">Animated</option>
                    <option value="Biographical">Biographical</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Disaster">Disaster</option>
                    <option value="Drama">Drama</option>
                    <option value="Epic">Epic</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Musical">Musical</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Space-Opera">Space-Opera</option>
                    <option value="Superhero">Superhero</option> */}
                </select><br /><br />
                <textarea cols="40" rows="5"
                    placeholder="Description"
                    value={newMovie.description}
                    onChange={handleDescriptionChange}/><br />
                <Router>
                    <Link to="/">
                    <button>Cancel</button>
                    </Link>
                </Router>
                    <button type="submit">Save</button>
            </form>
        </>
    )
}

export default AddMovie;