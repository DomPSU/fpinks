import React, { Component } from 'react';
import API from '../../apis/API';

class Login extends Component {
  componentDidMount() {
    console.log('Mounted');
    this.insertGapiScript();
  }

  insertGapiScript() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      this.initializeGoogleSignIn();
    };
    document.body.appendChild(script);
  }

  // TODO
  // eslint-disable-next-line class-methods-use-this
  initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
      console.log('API INITIATED');

      window.gapi.load('signin2', () => {
        const params = {
          onsuccess: (googleUser) => {
            console.log('User has finished signing in!');

            const idToken = googleUser.getAuthResponse().id_token;
            const email = googleUser.getBasicProfile().getEmail();

            this.sendCredentials(idToken, email);
          },
        };
        window.gapi.signin2.render('loginButton', params);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  sendCredentials(token, email) {
    API.instance
      .post('/auth', {
        token,
        email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  signOut() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });

      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log('User signed out.');
      });
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
          <a href="/login" onClick={this.signOut}>
            Sign out
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
