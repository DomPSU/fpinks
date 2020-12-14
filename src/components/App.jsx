import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import API from '../apis/API';

// general
import About from './general/About';
import Developers from './general/Developers';

// login
import Admin from './login/Admin';
import Login from './login/Login';
import Contribute from './login/Contribute';
import ProfileReviews from './login/Reviews';
import PrivacyPolicy from './login/PrivacyPolicy';
import TermsOfService from './login/TermsOfService';

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
import PensUpdate from './pens/PensUpdate';

// nibs
import NibsInsert from './nibs/NibsInsert';
import NibsUpdate from './nibs/NibsUpdate';

// penNibs
import PenNibsInsert from './penNibs/PenNibsInsert';

// inks
import InksInsert from './inks/InksInsert';
import InksUpdate from './inks/InksUpdate';

// papers
import PapersInsert from './papers/PapersInsert';
import PapersUpdate from './papers/PapersUpdate';

// writingSamples
import WritingSample from './writingSamples/WritingSample';

// colorReviews
import ColorReviewsInsert from './colorReviews/ColorReviewsInsert';
import ColorReviewsUpdate from './colorReviews/ColorReviewsUpdate';

// shadingReviews
import ShadingReviewsInsert from './shadingReviews/ShadingReviewsInsert';
import ShadingReviewsUpdate from './shadingReviews/ShadingReviewsUpdate';

// sheenReviews
import SheenReviewsInsert from './sheenReviews/SheenReviewsInsert';
import SheenReviewsUpdate from './sheenReviews/SheenReviewsUpdate';

// featheringReviews
import FeatheringReviewsInsert from './featheringReviews/FeatheringReviewsInsert';
import FeatheringReviewsUpdate from './featheringReviews/FeatheringReviewsUpdate';

// waterReviews
import WaterReviewsInsert from './waterReviews/WaterReviewsInsert';
import WaterReviewsUpdate from './waterReviews/WaterReviewsUpdate';

// dryingReviews
import DryingReviewsInsert from './dryingReviews/DryingReviewsInsert';
import DryingReviewsUpdate from './dryingReviews/DryingReviewsUpdate';

// transparencyReviews
import TransparencyReviewsInsert from './transparencyReviews/TransparencyReviewsInsert';
import TransparencyReviewsUpdate from './transparencyReviews/TransparencyReviewsUpdate';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isSignedIn: false, isAdmin: false };

    this.signIn = this.signIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.initializeGoogleSignIn = this.initializeGoogleSignIn.bind(this);
  }

  componentDidMount() {
    document
      .getElementById('gapiScript')
      .addEventListener('load', this.initializeGoogleSignIn);

    // call initializeGoogleSignIn  if gapi is already loaded to avoid race condition
    if (window.gapiLoaded === true) {
      this.initializeGoogleSignIn();
    }
  }

  signIn = async () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    this.setState({
      isSignedIn: authInstance.isSignedIn.get(),
    });

    authInstance.isSignedIn.listen((isSignedIn) => {
      this.setState({ isSignedIn, isAdmin: false });
    });

    const googleUser = authInstance.currentUser.get();
    const authRes = await googleUser.reloadAuthResponse();
    this.isAdmin(authRes.id_token);
  };

  handleSignOut = async () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    await authInstance.signOut();
  };

  initializeGoogleSignIn = () => {
    window.gapi.load('auth2', async () => {
      await window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
      this.signIn();
    });
  };

  // TODO
  // eslint-disable-next-line class-methods-use-this
  isAdmin(idToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };

    API.instance
      .get('/users/level', config)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isAdmin: true });
        } else {
          this.setState({ isAdmin: false });
        }
      })
      .catch((error) => {
        this.setState({ isAdmin: false });
        console.log(error);
      });
  }

  render = () => {
    console.log(this.state);
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
              path="/users"
              key="/users"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* pens */}
            <Route
              exact
              path="/pens/edit/"
              key="/pens/edit/"
              render={() =>
                isAdmin ? <PensUpdate /> : <Redirect to="/unauthorized" />
              }
            />

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
              path="/pens"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* nibs */}
            <Route
              exact
              path="/nibs/edit/"
              key="/nibs/edit/"
              render={() =>
                isAdmin ? <NibsUpdate /> : <Redirect to="/unauthorized" />
              }
            />

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
              path="/nibs"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
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
              path="/pen-nibs"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* inks */}
            <Route
              exact
              path="/inks/edit/"
              key="/inks/edit/"
              render={() =>
                isAdmin ? <InksUpdate /> : <Redirect to="/unauthorized" />
              }
            />

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
              path="/inks"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* papers */}
            <Route
              exact
              path="/papers/edit/"
              key="/papers/edit/"
              render={() =>
                isAdmin ? <PapersUpdate /> : <Redirect to="/unauthorized" />
              }
            />

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
              path="/papers/"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* writingSamples */}
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
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* colorReviews */}
            <Route
              exact
              path="/color-reviews/edit/"
              key="/color-reviews/edit/"
              render={() =>
                isAdmin ? (
                  <ColorReviewsUpdate />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

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
              path="/color-reviews"
              key="/color-reviews"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* shadingReviews */}
            <Route
              exact
              path="/shading-reviews/edit/"
              key="/shading-reviews/edit/"
              render={() =>
                isAdmin ? (
                  <ShadingReviewsUpdate />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

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
              path="/shading-reviews"
              key="/shading-reviews"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* sheenReviews */}
            <Route
              exact
              path="/sheen-reviews/edit/"
              key="/sheen-reviews/edit/"
              render={() =>
                isAdmin ? (
                  <SheenReviewsUpdate />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

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
              path="/sheen-reviews"
              key="/sheen-reviews"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* featheringReviews */}
            <Route
              exact
              path="/feathering-reviews/edit/"
              key="/feathering-reviews/edit/"
              render={() =>
                isAdmin ? (
                  <FeatheringReviewsUpdate />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

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
              path="/feathering-reviews"
              key="/feathering-reviews"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* waterReviews */}
            <Route
              exact
              path="/water-reviews/edit/"
              key="/water-reviews/edit/"
              render={() =>
                isAdmin ? (
                  <WaterReviewsUpdate />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

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
              path="/water-reviews"
              key="/water-reviews"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* dryingReviews */}
            <Route
              exact
              path="/drying-reviews/edit/"
              key="/drying-reviews/edit/"
              render={() =>
                isAdmin ? (
                  <DryingReviewsUpdate />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

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
              path="/drying-reviews"
              key="/drying-reviews"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

            {/* transparencyReviews */}
            <Route
              exact
              path="/transparency-reviews/edit/"
              key="/transparency-reviews/edit/"
              render={() =>
                isAdmin ? (
                  <TransparencyReviewsUpdate />
                ) : (
                  <Redirect to="/unauthorized" />
                )
              }
            />

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
              path="/transparency-reviews"
              key="/transparency-reviews"
              render={() => (isAdmin ? <AdminIndex /> : <Index />)}
            />

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
            <Route
              exact
              path="/login"
              key="/login"
              render={() => <Login signIn={this.signIn} />}
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

            <Route exact path="/developers" render={() => <Developers />} />

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
