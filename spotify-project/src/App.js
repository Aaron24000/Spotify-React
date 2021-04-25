import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./links/Home";
import ArtistSearch from "./links/ArtistSearch";
import GenreSearch from "./links/GenreSearch";


function App() {
  return (
    <Router>
    <div>
    <Navbar />
    <div className="content">
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/artist-search'>
          <ArtistSearch />
        </Route>
        <Route path='/genre-search'>
          <GenreSearch />
        </Route>
      </Switch>
    </div>
    </div>
    </Router>
  );
}

export default App;
