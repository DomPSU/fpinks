import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './general/Header';
import Gallery from './gallery/Gallery';
import Contribute from './contribute/Contribute';
import About from './about/About';
import Admin from './admin/Admin';

// users
import UsersIndex from './users/UsersIndex';

// pens
import PensIndex from './pens/PensIndex';
import PensInsert from './pens/PensInsert';

// nibs
import NibsIndex from './nibs/NibsIndex';
import NibsInsert from './nibs/NibsInsert';

// penNibs
// TODO fix eslint issue below, no clue why it is happening
// eslint-disable-next-line import/extensions
import PenNibsIndex from './penNibs/PenNibsIndex.jsx';

// inks
import InksIndex from './inks/InksIndex';
import InksInsert from './inks/InksInsert';

// writingSamples
import WritingSamplesIndex from './writingSamples/WritingSamplesIndex';

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          {/* users */}
          <Route path="/users/unapproved">
            <UsersIndex link="/users/unapproved" />
          </Route>
          <Route path="/users">
            <UsersIndex link="/users" />
          </Route>
          {/* pens */}
          <Route path="/pens/unapproved">
            <PensIndex link="/pens/unapproved" />
          </Route>
          <Route path="/pens/new">
            <PensInsert />
          </Route>
          <Route path="/pens">
            <PensIndex link="/pens" />
          </Route>
          {/* nibs */}
          <Route path="/nibs/unapproved">
            <NibsIndex link="/nibs/unapproved" />
          </Route>
          <Route path="/nibs/new">
            <NibsInsert />
          </Route>
          <Route path="/nibs">
            <NibsIndex link="/nibs" />
          </Route>
          {/* penNibs */}
          <Route path="/pen-nibs/unapproved">
            <PenNibsIndex link="/pen-nibs/unapproved" />
          </Route>
          <Route path="/pen-nibs">
            <PenNibsIndex link="/pen-nibs/" />
          </Route>
          {/* inks */}
          <Route path="/inks/new">
            <InksInsert />
          </Route>
          <Route path="/inks/unapproved">
            <InksIndex link="/inks/unapproved" />
          </Route>
          <Route path="/inks">
            <InksIndex link="/inks" />
          </Route>
          {/* writingSamples */}
          <Route path="/writing-samples/unapproved">
            <WritingSamplesIndex link="/writing-samples/unapproved" />
          </Route>
          <Route path="/writing-samples">
            <WritingSamplesIndex link="/writing-samples" />
          </Route>
          {/* other */}
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
