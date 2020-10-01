import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './navigation.css';
import { signOut } from '../../util/util';

export default function Header(props) {
  const history = useHistory();
  // TODO fix by redirecting to login on signOut
  const redirect = useCallback(() => history.push('/'), [history]);

  const { isSignedIn, isAdmin, handleSignOut } = props;
  return (
    <nav className="navbar navbar-expand navbar-light bg-primary fixed-top">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/contribute">
              Contribute
            </Link>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin">
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {!isSignedIn && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            </li>
          )}
          {isSignedIn && (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Profile
              </a>
              <div
                className="dropdown-menu dropdown-menu-right bg-primary"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item dropdown-item-overwrite text-white"
                  to="/profile-writing-samples"
                >
                  Writing Samples
                </Link>
                <Link
                  className="dropdown-item dropdown-item-overwrite text-white"
                  to="/profile-reviews"
                >
                  Reviews
                </Link>
                <div className="dropdown-divider" />
                <button
                  type="button"
                  className="dropdown-item dropdown-item-overwrite text-white"
                  onClick={() => {
                    signOut();
                    handleSignOut();
                    redirect();
                  }}
                >
                  Sign Out
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
