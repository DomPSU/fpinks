import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './general/Header';
import Gallery from './gallery/Gallery';
import Contribute from './contribute/Contribute';
import About from './general/About';
import Users from './users/Users';

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contribute">
            <Contribute />
          </Route>
          <Route path="/">
            <Gallery />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
