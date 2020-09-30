import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

export default function Footer() {
  return (
    <nav className="navbar navbar-overwrite navbar-expand navbar-light bg-primary fixed-bottom">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav navbar-nav-overwrite m-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/privacy-policy">
              Privacy
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/terms-of-service">
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
