import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieItemDetails from '../MovieItemDetails/MovieItemDetails';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route exact path="/details">
          {/* Details page */}
          <MovieItemDetails />
        </Route>
        <Route path="/addMovie">
          {/* Add Movie page */}
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
