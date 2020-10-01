import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './shared/Header';
import Footer from './shared/Footer';
import Gallery from './shared/Gallery';
import Contribute from './contribute/Contribute';
import About from './about/About';
import Login from './login/Login';
import ProfileReviews from './login/Reviews';
import PrivacyPolicy from './login/PrivacyPolicy';
import TermsOfService from './login/TermsOfService';
import Admin from './admin/Admin';
import {
  developmentSignIn,
  developmentAdmin,
  isDevelopment,
} from '../util/util';

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
import ColorReviewsInsert from './colorReviews/ColorReviewsInsert';

// shadingReviews
import ShadingReviewsInsert from './shadingReviews/ShadingReviewsInsert';

// sheenReviews
import SheenReviewsInsert from './sheenReviews/SheenReviewsInsert';

// featheringReviews
import FeatheringReviewsInsert from './featheringReviews/FeatheringReviewsInsert';

// waterReviews
import WaterReviewsInsert from './waterReviews/WaterReviewsInsert';

// dryingReviews
import DryingReviewsInsert from './dryingReviews/DryingReviewsInsert';

// transparencyReviews
import TransparencyReviewsInsert from './transparencyReviews/TransparencyReviewsInsert';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isSignedIn: false, isAdmin: false };

    if (isDevelopment()) {
      this.state.isSignedIn = developmentSignIn();
      this.state.isAdmin = developmentAdmin();
    } else {
      this.handleSignIn = this.handleSignIn.bind(this);
      this.handleAdminSignIn = this.handleAdminSignIn.bind(this);
      this.handleSignOut = this.handleSignOut.bind(this);
      this.initializeGoogleSignIn = this.initializeGoogleSignIn.bind(this);

      // call initializeGoogleSignIn right after gapi is loaded
      document
        .getElementById('gapiScript')
        .addEventListener('load', this.initializeGoogleSignIn);

      // call initializeGoogleSignIn  if gapi is already loaded to avoid race condition
      if (window.gapiLoaded === true) {
        this.initializeGoogleSignIn();
      }
    }
  }

  handleSignIn = () => {
    this.setState({ isSignedIn: true });
  };

  handleAdminSignIn = (isAdminRes) => {
    this.setState({ isAdmin: isAdminRes });
  };

  handleSignOut = () => {
    this.setState({ isSignedIn: false, isAdmin: false });
  };

  initializeGoogleSignIn = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          const isSignedIn = authInstance.isSignedIn.get();
          this.setState({ isSignedIn });

          // eslint-disable-next-line no-shadow
          authInstance.isSignedIn.listen((isSignedIn) => {
            this.setState({ isSignedIn });
          });
        });
    });
  };

  render = () => {
    const { isSignedIn, isAdmin } = this.state;

    return (
      <Router>
        <div>
          <Header
            isSignedIn={isSignedIn}
            isAdmin={isAdmin}
            handleSignOut={this.handleSignOut}
          />
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
            <Route path="/color-reviews/new">
              <ColorReviewsInsert />
            </Route>
            <Route path="/color-reviews/unapproved">
              <Index link="/color-reviews/unapproved" />
            </Route>
            <Route path="/color-reviews">
              <Index link="/color-reviews" />
            </Route>
            {/* shadingReviews */}
            <Route path="/shading-reviews/new">
              <ShadingReviewsInsert />
            </Route>
            <Route path="/shading-reviews/unapproved">
              <Index link="/shading-reviews/unapproved" />
            </Route>
            <Route path="/shading-reviews">
              <Index link="/shading-reviews" />
            </Route>
            {/* sheenReviews */}
            <Route path="/sheen-reviews/new">
              <SheenReviewsInsert />
            </Route>
            <Route path="/sheen-reviews/unapproved">
              <Index link="/sheen-reviews/unapproved" />
            </Route>
            <Route path="/sheen-reviews">
              <Index link="/sheen-reviews" />
            </Route>
            {/* featheringReviews */}
            <Route path="/feathering-reviews/new">
              <FeatheringReviewsInsert />
            </Route>
            <Route path="/feathering-reviews/unapproved">
              <Index link="/feathering-reviews/unapproved" />
            </Route>
            <Route path="/feathering-reviews">
              <Index link="/feathering-reviews" />
            </Route>
            {/* waterReviews */}
            <Route path="/water-reviews/new">
              <WaterReviewsInsert />
            </Route>
            <Route path="/water-reviews/unapproved">
              <Index link="/water-reviews/unapproved" />
            </Route>
            <Route path="/water-reviews">
              <Index link="/water-reviews" />
            </Route>
            {/* dryingReviews */}
            <Route path="/drying-reviews/new">
              <DryingReviewsInsert />
            </Route>
            <Route path="/drying-reviews/unapproved">
              <Index link="/drying-reviews/unapproved" />
            </Route>
            <Route path="/drying-reviews">
              <Index link="/drying-reviews" />
            </Route>
            {/* transparencyReviews */}
            <Route path="/transparency-reviews/new">
              <TransparencyReviewsInsert />
            </Route>
            <Route path="/transparency-reviews/unapproved">
              <Index link="/transparency-reviews/unapproved" />
            </Route>
            <Route path="/transparency-reviews">
              <Index link="/transparency-reviews" />
            </Route>
            {/* other */}
            <Route
              path="/admin"
              render={() => (isAdmin ? <Admin /> : <div>Unauthorized</div>)}
            />
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contribute">
              <Contribute />
            </Route>
            <Route path="/login">
              <Login
                handleSignIn={this.handleSignIn}
                handleAdminSignIn={this.handleAdminSignIn}
              />
            </Route>
            <Route path="/profile-reviews">
              <ProfileReviews />
            </Route>
            <Route
              path="/profile-writing-samples"
              key="profile-writing-samples"
            >
              <Gallery
                queryStorage="profile writing samples query"
                pageStorage="profile writing samples page"
                path="writing-samples/search/"
                noResultsMessage="Query matches none of your writing samples."
              />
            </Route>
            <Route path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms-of-service">
              <TermsOfService />
            </Route>
            <Route path="/" key="galley">
              <Gallery
                queryStorage="gallery query"
                pageStorage="gallery page"
                path="writing-samples/search/"
                noResultsMessage="Query has no matches."
              />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  };
}

export default App;

// TODO make users admin only
// TODO make writing-samples available to index
