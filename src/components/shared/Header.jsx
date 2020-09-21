import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
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
          <li className="nav-item">
            <Link className="nav-link text-white" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin">
              Admin
            </Link>
          </li>
        </ul>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
