import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  developmentSignIn,
  developmentAdmin,
  isDevelopment,
} from '../util/util';

// general
import Contribute from './contribute/Contribute';
import About from './about/About';

// login
import Login from './login/Login';
import ProfileReviews from './login/Reviews';
import PrivacyPolicy from './login/PrivacyPolicy';
import TermsOfService from './login/TermsOfService';
import Admin from './admin/Admin';

// shared
import Index from './shared/Index';
import AdminIndex from './shared/AdminIndex';
import Gallery from './shared/Gallery';
import Header from './shared/Header';
import Footer from './shared/Footer';
import GenericMessage from './shared/genericMessage';

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
            <Route
              exact
              path="/users/admin/:approved"
              key="/users/admin/:approved"
              render={() =>
                isAdmin ? (
                  <AdminIndex link="/users/admin" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/users"
              key="/users"
              render={() =>
                isAdmin ? (
                  <Index link="/users" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* pens */}
            <Route
              exact
              path="/pens/new"
              key="/pens/new"
              render={() =>
                isAdmin ? <PensInsert /> : <Redirect to="/unauthorized" />
              }
            />

            <Route
              exact
              path="/pens/admin/:approved"
              key="/pens/admin/:approved"
              render={() =>
                isAdmin ? (
                  <AdminIndex link="/pens/admin" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/pens"
              key="/pens"
              render={() =>
                isAdmin ? (
                  <Index link="/pens" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* nibs */}
            <Route
              exact
              path="/nibs/new"
              key="/nibs/new"
              render={() =>
                isAdmin ? <NibsInsert /> : <Redirect to="/unauthorized" />
              }
            />

            <Route
              exact
              path="/nibs/admin/:approved"
              key="/nibs/admin/:approved"
              render={() =>
                isAdmin ? (
                  <AdminIndex link="/nibs/admin" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/nibs"
              key="/nibs"
              render={() =>
                isAdmin ? (
                  <Index link="/nibs" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* penNibs */}
            <Route
              exact
              path="/pen-nibs/new"
              key="/pen-nibs/new"
              render={() =>
                isAdmin ? <PenNibsInsert /> : <Redirect to="/unauthorized" />
              }
            />

            <Route
              exact
              path="/pen-nibs/admin/:approved"
              key="/pen-nibs/admin/:approved"
              render={() =>
                isAdmin ? (
                  <AdminIndex link="/pen-nibs/admin" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/pen-nibs"
              key="/pen-nibs"
              render={() =>
                isAdmin ? (
                  <PenNibsIndex link="/pen-nibs/" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* inks */}
            <Route
              exact
              path="/inks/new"
              key="/inks/new"
              render={() =>
                isAdmin ? <InksInsert /> : <Redirect to="/unauthorized" />
              }
            />

            <Route
              exact
              path="/inks/admin/:approved"
              key="/inks/admin/:approved"
              render={() =>
                isAdmin ? (
                  <AdminIndex link="/inks/admin" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/inks"
              key="/inks"
              render={() =>
                isAdmin ? (
                  <Index link="/inks" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* papers */}
            <Route
              exact
              path="/papers/new"
              key="/papers/new"
              render={() =>
                isAdmin ? <PapersInsert /> : <Redirect to="/unauthorized" />
              }
            />

            <Route
              exact
              path="/papers/admin/:approved"
              key="/papers/admin/:approved"
              render={() =>
                isAdmin ? (
                  <AdminIndex link="/papers/admin" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/papers"
              key="/papers"
              render={() =>
                isAdmin ? (
                  <Index link="/papers" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* writingSamples */}
            <Route
              exact
              path="/writing-samples/admin/:approved"
              key="/writing-samples/admin/:approved"
              render={() =>
                isAdmin ? (
                  <AdminIndex link="/writing-samples/admin" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/writing-samples/:id"
              key="/writing-samples/:id"
              render={() => <WritingSample />}
            />

            <Route
              exact
              path="/writing-samples"
              key="/writing-samples"
              render={() =>
                isAdmin ? (
                  <WritingSamplesIndex link="/writing-samples" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* colorReviews */}
            <Route
              exact
              path="/color-reviews/new"
              key="/color-reviews/new"
              render={() =>
                isAdmin ? (
                  <ColorReviewsInsert />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/color-reviews/admin/:approved"
              key="/color-reviews/admin/:approved"
              render={() =>
                isAdmin ? (
                  <AdminIndex link="/color-reviews/admin" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/color-reviews"
              key="/color-reviews"
              render={() =>
                isAdmin ? (
                  <Index link="/color-reviews" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* shadingReviews */}
            <Route
              exact
              path="/shading-reviews/new"
              key="/shading-reviews/new"
              render={() =>
                isAdmin ? (
                  <ShadingReviewsInsert />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/shading-reviews/admin/:approved"
              key="/shading-reviews/admin/:approved"
              render={() =>
                isAdmin ? (
                  <AdminIndex link="/shading-reviews/admin" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/shading-reviews"
              key="/shading-reviews"
              render={() =>
                isAdmin ? (
                  <Index link="/shading-reviews" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* sheenReviews */}
            <Route
              exact
              path="/sheen-reviews/new"
              key="/sheen-reviews/new"
              render={() =>
                isAdmin ? (
                  <SheenReviewsInsert />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/sheen-reviews/unapproved"
              key="/sheen-reviews/unapproved"
              render={() =>
                isAdmin ? (
                  <Index link="/sheen-reviews/unapproved" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/sheen-reviews"
              key="/sheen-reviews"
              render={() =>
                isAdmin ? (
                  <Index link="/sheen-reviews" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* featheringReviews */}
            <Route
              exact
              path="/feathering-reviews/new"
              key="/feathering-reviews/new"
              render={() =>
                isAdmin ? (
                  <FeatheringReviewsInsert />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/feathering-reviews/unapproved"
              key="/feathering-reviews/unapproved"
              render={() =>
                isAdmin ? (
                  <Index link="/feathering-reviews/unapproved" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/feathering-reviews"
              key="/feathering-reviews"
              render={() =>
                isAdmin ? (
                  <Index link="/feathering-reviews" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* waterReviews */}
            <Route
              exact
              path="/water-reviews/new"
              key="/water-reviews/new"
              render={() =>
                isAdmin ? (
                  <WaterReviewsInsert />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/water-reviews/unapproved"
              key="/water-reviews/unapproved"
              render={() =>
                isAdmin ? (
                  <Index link="/water-reviews/unapproved" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/water-reviews"
              key="/water-reviews"
              render={() =>
                isAdmin ? (
                  <Index link="/water-reviews" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* dryingReviews */}
            <Route
              exact
              path="/drying-reviews/new"
              key="/drying-reviews/new"
              render={() =>
                isAdmin ? (
                  <DryingReviewsInsert />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/drying-reviews/unapproved"
              key="/drying-reviews/unapproved"
              render={() =>
                isAdmin ? (
                  <Index link="/drying-reviews/unapproved" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/drying-reviews"
              key="/drying-reviews"
              render={() =>
                isAdmin ? (
                  <Index link="/drying-reviews" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* transparencyReviews */}
            <Route
              exact
              path="/transparency-reviews/new"
              key="/transparency-reviews/new"
              render={() =>
                isAdmin ? (
                  <TransparencyReviewsInsert />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/transparency-reviews/unapproved"
              key="/transparency-reviews/unapproved"
              render={() =>
                isAdmin ? (
                  <Index link="/transparency-reviews/unapproved" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            <Route
              exact
              path="/transparency-reviews"
              key="/transparency-reviews"
              render={() =>
                isAdmin ? (
                  <Index link="/transparency-reviews" />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

            {/* other */}
            {/* Admin */}
            <Route
              exact
              path="/admin"
              key="/admin"
              render={() =>
                isAdmin ? <Admin /> : <Redirect to="/unauthorized" />
              }
            />

            {/* Login */}
            {/* TODO Maybe add a redirect here to make google login quicker? Although redirect might never render button. */}
            <Route
              exact
              path="/login"
              key="/login"
              render={() => (
                <Login
                  handleSignIn={this.handleSignIn}
                  handleAdminSignIn={this.handleAdminSignIn}
                />
              )}
            />

            <Route
              exact
              path="/profile-reviews"
              key="/profile-reviews"
              render={() =>
                isSignedIn ? <ProfileReviews /> : <Redirect to="/login" />
              }
            />

            {/* Profile Writing Samples */}
            <Route
              exact
              path="/profile-writing-samples"
              key="/profile-writing-samples"
              render={() =>
                isSignedIn ? (
                  <Gallery
                    queryStorage="profile writing samples query"
                    pageStorage="profile writing samples page"
                    path="writing-samples/search/"
                    noResultsMessage="Query matches none of your writing samples."
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              exact
              path="/unauthorized"
              key="/unauthorized"
              render={() => <GenericMessage message="Unauthorized" />}
            />

            <Route
              exact
              path="/privacy-policy"
              key="/privacy-policy"
              render={() => <PrivacyPolicy />}
            />

            <Route
              exact
              path="/terms-of-service"
              key="/terms-of-service"
              render={() => <TermsOfService />}
            />

            <Route exact path="/about" render={() => <About />} />

            <Route
              exact
              path="/contribute"
              key="/contribute"
              render={() => <Contribute />}
            />

            {/* Gallery */}
            <Route
              exact
              path="/"
              key="/"
              render={() => (
                <Gallery
                  queryStorage="gallery query"
                  pageStorage="gallery page"
                  path="writing-samples/search/"
                  noResultsMessage="Query has no matches."
                />
              )}
            />

            <Route path="*" render={() => <GenericMessage message="404" />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  };
}

export default App;
