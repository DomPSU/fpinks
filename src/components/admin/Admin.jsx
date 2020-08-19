import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div>
      <br />
      <Link to="/users">Users Index</Link>
      <br />
      <br />
      <Link to="/writing-samples">Writing Samples Index</Link>
      <br />
      <br />
      <Link to="/inks">Inks Index</Link>
      <br />
      <br />
      <Link to="/inks/new">Inks Insert</Link>
    </div>
  );
}
