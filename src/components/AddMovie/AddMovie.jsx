function AddMovie() {

    return(
        <>
            <form>
                <input required
                    placeholder="Title"/><br />
                <input required
                    placeholder="Poster Image"/><br /><br /> 
                <label for="genres">Choose a genre</label><br />
                <select id="genres" name="genres" label="genres">
                    <option>Adventure</option>
                    <option>Animated</option>
                    <option>Biographical</option>
                    <option>Comedy</option>
                    <option>Disaster</option>
                    <option>Drama</option>
                    <option>Epic</option>
                    <option>Fantasy</option>
                    <option>Musical</option>
                    <option>Romantic</option>
                    <option>Science Fiction</option>
                    <option>Space-Opera</option>
                    <option>Superhero</option>
                </select><br /><br />
                <textarea cols="40" rows="5"
                    placeholder="Description"/><br />
                <button>Cancel</button>
                <button>Save</button>
            </form>
        </>
    )
}

export default AddMovie;