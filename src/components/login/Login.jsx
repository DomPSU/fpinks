import React, { Component } from 'react';
import API from '../../apis/API';
import { signOut } from '../../util/util';

class Login extends Component {
  componentDidMount() {
    this.renderSignIn = this.renderSignIn.bind(this);

    // call renderSignIn right after gapi is loaded
    document
      .getElementById('gapiScript')
      .addEventListener('load', this.renderSignIn);

    // call renderSignIn if gapi is already loaded to avoid race condition
    if (window.gapiLoaded === true) {
      this.renderSignIn();
    }
  }

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
    window.gapi.load('signin2', () => {
      const params = {
        onsuccess: (googleUser) => {
          console.log('User has finished signing in!');

          const idToken = googleUser.getAuthResponse().id_token;

          this.sendIDToken(idToken);
        },
      };
      window.gapi.signin2.render('loginButton', params);
    });
  }

  render() {
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
        <div className="d-flex justify-content-center">
          <button type="button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
