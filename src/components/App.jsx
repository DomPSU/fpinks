import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './general/Header';
import Gallery from './gallery/Gallery';
import Contribute from './contribute/Contribute';
import About from './about/About';
import UsersIndex from './users/UsersIndex';
import WritingSamplesIndex from './writingSamples/WritingSamplesIndex';

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/writing-samples">
            <WritingSamplesIndex />
          </Route>
          <Route path="/users">
            <UsersIndex />
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
