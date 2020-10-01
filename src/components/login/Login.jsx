import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../apis/API';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { redirect: false };

    this.renderSignIn = this.renderSignIn.bind(this);
  }

  componentDidMount() {
    // call renderSignIn right after gapi is loaded
    document
      .getElementById('gapiScript')
      .addEventListener('load', this.renderSignIn);

    // call renderSignIn if gapi is already loaded to avoid race condition
    if (window.gapiLoaded === true) {
      this.renderSignIn();
    }
  }

  // TODO
  // eslint-disable-next-line class-methods-use-this
  sendIDToken(idToken) {
    API.instance
      .post('/users', {
        idToken,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderSignIn() {
    const { handleSignIn } = this.props;

    window.gapi.load('signin2', () => {
      const params = {
        onsuccess: (googleUser) => {
          console.log('User has finished signing in!');

          const idToken = googleUser.getAuthResponse().id_token;

          this.sendIDToken(idToken);

          handleSignIn();
          this.setState({ redirect: true });
        },
      };
      window.gapi.signin2.render('loginButton', params);
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-2" />
            <h3 className="col-12 col-md-8 p-5 text-center">
              An account is only needed to submit reviews. An account also lets
              you track your contributed writing samples and allows us to email
              you if we have questions about your contributed writing samples.
            </h3>
            <div className="col-md-2" />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <a href="/login" id="loginButton">
            Sign in with Google
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
