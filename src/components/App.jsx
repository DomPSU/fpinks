import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './general/Header';
import Gallery from './gallery/Gallery';
import Contribute from './contribute/Contribute';
import About from './about/About';
import UsersIndex from './users/UsersIndex';
import WritingSamplesIndex from './writingSamples/WritingSamplesIndex';
import Admin from './admin/Admin';
import InksIndex from './inks/InksIndex';
import InksInsert from './inks/InksInsert';

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/inks/new">
            <InksInsert />
          </Route>
          <Route path="/inks">
            <InksIndex />
          </Route>
          <Route path="/writing-samples">
            <WritingSamplesIndex />
          </Route>
          <Route path="/users">
            <UsersIndex />
          </Route>
          <Route path="/admin">
            <Admin />
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

// TODO make users admin only
// TODO make writing-samples available to index
