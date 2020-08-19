import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="collapse navbar-collapse" id="navbarNav">
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
          <li className="nav-item">
            <Link className="nav-link text-white" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/users">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/writing-samples">
              Writing Samples
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
