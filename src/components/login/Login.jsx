import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        const { handleAdminSignIn } = this.props;

        if (res.status === 200) {
          handleAdminSignIn(true);
        } else {
          handleAdminSignIn(false);
        }

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
          this.isAdmin(idToken);

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
        <div className="d-flex justify-content-center p-5">
          <a href="/login" id="loginButton">
            Sign in with Google
          </a>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
  handleAdminSignIn: PropTypes.func.isRequired,
};

export default Login;
