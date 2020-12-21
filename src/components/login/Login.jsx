import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../apis/API';
import { isDevelopment } from '../../util/util';

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
      .catch((error) => {
        console.log(error);
      });
  }

  renderSignIn = async () => {
    window.gapi.load('signin2', () => {
      const params = {
        onsuccess: (googleUser) => {
          const idToken = googleUser.getAuthResponse().id_token;

          if (isDevelopment()) {
            console.log('ID token for testing');
            console.log(idToken);
          }

          this.sendIDToken(idToken);
          this.setState({ redirect: true });
        },
      };
      window.gapi.signin2.render('loginButton', params);
    });
  };

  render() {
    const { redirect } = this.state;
    const { signIn } = this.props;

    if (redirect) {
      signIn();
      return <Redirect push to="/" />;
    }

    return (
      <div>
        <div className="d-flex justify-content-center p-5">
          <a href="/login" id="loginButton">
            Sign in with Google
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
