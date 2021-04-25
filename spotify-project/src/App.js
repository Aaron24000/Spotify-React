import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./links/Home";
import NewRelease from "./links/NewRelease";
import GenreSearch from "./links/GenreSearch";
import About from "./links/About";
import NotFound from "./links/NotFound";


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
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/new-release'>
          <NewRelease />
        </Route>
        <Route path='/genre-search'>
          <GenreSearch />
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </div>
    </div>
    </Router>
  );
}

export default App;
