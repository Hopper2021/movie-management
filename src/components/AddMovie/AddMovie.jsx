import { HashRouter as Router, Route, Link } from 'react-router-dom';
import React, { useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { useHistory } from 'react-router-dom';

function AddMovie() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres)

    /* Defines base movie and useState to change properties */
    let [newMovie, setNewMovie] = useState(
        { title: '', poster: '', description: '', genre: '' }
    );
    
    /* There is a handle change function for each input type:
        Title, Poster, Description and Genre */
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
        setNewMovie({...newMovie, genre: event.target.value });
    }

    /* Prevent default keep the form from from auto submiting on page load 
        dispatch provides the newMovie value with properties of: Title, Poster,
        Description and Genre (dropdown), once Save is clicked, the information
        is posted to the server and you are directed back to the home page (MovieList) */
    const addNewMovie = (event) => {
        event.preventDefault();

        dispatch({ type: 'POST_NEW_MOVIE', payload: newMovie });
        setNewMovie({ title: '', poster: '', description: '', genre: '' });
        console.log('This is the new movie - ', newMovie);
        history.push('/');
    }

    return(
        <>  {/* Form onSubmit submits all inputs as one object */}
            <form onSubmit={addNewMovie}>
                <input required
                    placeholder="Title"
                    value={newMovie.title}
                    onChange={handleTitleChange}/>
                <br />
                <input required
                    placeholder="Poster Image"
                    value={newMovie.poster}
                    onChange={handlePosterChange}/>
                <br />
                <br /> 
                <label for="genres">
                    Choose a genre
                </label>
                    <br />
                <select id="genres" name="genres" label="genres"
                onChange={(event) => handleGenreChange(event)}>
                    {genres.map(({name}) => (
                        <option key={name.id} value={name}>{name}</option>
                    ))}
                </select>
                <br />
                <br />
                <textarea cols="40" rows="5"
                    placeholder="Description"
                    value={newMovie.description}
                    onChange={handleDescriptionChange}/><br />
                {/* Cancel Link that will bring you back to the home page */}
                <Router>
                    <Link to="/">Cancel</Link>
                </Router>
                {/* Save button submits the entire form as one object */}
                    <button type="submit">Save</button>
            </form>
        </>
    )
}

export default AddMovie;