import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './general/Header';
import Gallery from './gallery/Gallery';
import Contribute from './contribute/Contribute';
import About from './about/About';
import Admin from './admin/Admin';

// shared
import Index from './shared/Index';

// users

// pens
import PensInsert from './pens/PensInsert';

// nibs
import NibsInsert from './nibs/NibsInsert';

// penNibs
import PenNibsIndex from './penNibs/PenNibsIndex';
import PenNibsInsert from './penNibs/PenNibsInsert';

// inks
import InksInsert from './inks/InksInsert';

// papers
import PapersInsert from './papers/PapersInsert';

// writingSamples
import WritingSamplesIndex from './writingSamples/WritingSamplesIndex';
import WritingSample from './writingSamples/WritingSample';

// colorReviews

// shadingReviews

// sheenReviews

// waterReviews

// dryingReviews

// transparencyReviews

// featheringReviews

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          {/* users */}
          <Route path="/users/unapproved">
            <Index link="/users/unapproved" />
          </Route>
          <Route path="/users">
            <Index link="/users" />
          </Route>
          {/* pens */}
          <Route path="/pens/unapproved">
            <Index link="/pens/unapproved" />
          </Route>
          <Route path="/pens/new">
            <PensInsert />
          </Route>
          <Route path="/pens">
            <Index link="/pens" />
          </Route>
          {/* nibs */}
          <Route path="/nibs/unapproved">
            <Index link="/nibs/unapproved" />
          </Route>
          <Route path="/nibs/new">
            <NibsInsert />
          </Route>
          <Route path="/nibs">
            <Index link="/nibs" />
          </Route>
          {/* penNibs */}
          <Route path="/pen-nibs/unapproved">
            <PenNibsIndex link="/pen-nibs/unapproved" />
          </Route>
          <Route path="/pen-nibs/new">
            <PenNibsInsert />
          </Route>
          <Route path="/pen-nibs">
            <PenNibsIndex link="/pen-nibs/" />
          </Route>
          {/* inks */}
          <Route path="/inks/new">
            <InksInsert />
          </Route>
          <Route path="/inks/unapproved">
            <Index link="/inks/unapproved" />
          </Route>
          <Route path="/inks">
            <Index link="/inks" />
          </Route>
          {/* papers */}
          <Route path="/papers/new">
            <PapersInsert />
          </Route>
          <Route path="/papers/unapproved">
            <Index link="/papers/unapproved" />
          </Route>
          <Route path="/papers">
            <Index link="/papers" />
          </Route>
          {/* writingSamples */}
          <Route path="/writing-samples/unapproved">
            <WritingSamplesIndex link="/writing-samples/unapproved" />
          </Route>
          <Route path="/writing-samples/:id">
            <WritingSample />
          </Route>
          <Route path="/writing-samples">
            <WritingSamplesIndex link="/writing-samples" />
          </Route>
          {/* colorReviews */}
          {/* TODO insert */}
          <Route path="/color-reviews/unapproved">
            <Index link="/color-reviews/unapproved" />
          </Route>
          <Route path="/color-reviews">
            <Index link="/color-reviews" />
          </Route>
          {/* shadingReviews */}
          {/* TODO insert */}
          <Route path="/shading-reviews/unapproved">
            <Index link="/shading-reviews/unapproved" />
          </Route>
          <Route path="/shading-reviews">
            <Index link="/shading-reviews" />
          </Route>
          {/* sheenReviews */}
          {/* TODO insert */}
          <Route path="/sheen-reviews/unapproved">
            <Index link="/sheen-reviews/unapproved" />
          </Route>
          <Route path="/sheen-reviews">
            <Index link="/sheen-reviews" />
          </Route>
          {/* waterReviews */}
          {/* TODO insert */}
          <Route path="/water-reviews/unapproved">
            <Index link="/water-reviews/unapproved" />
          </Route>
          <Route path="/water-reviews">
            <Index link="/water-reviews" />
          </Route>
          {/* dryingReviews */}
          {/* TODO insert */}
          <Route path="/drying-reviews/unapproved">
            <Index link="/drying-reviews/unapproved" />
          </Route>
          <Route path="/drying-reviews">
            <Index link="/drying-reviews" />
          </Route>
          {/* transparencyReviews */}
          {/* featheringReviews */}
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
