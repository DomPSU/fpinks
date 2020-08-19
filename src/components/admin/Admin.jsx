import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="container">
      <div className="row">
        <h1 className="mt-5">Users</h1>
      </div>
      <div className="row">
        <Link className="p-3" to="/users">
          Approved Users
        </Link>
        <Link className="p-3" to="/users/unapproved">
          Unapproved Users
        </Link>
      </div>
      <div className="row">
        <h1 className="mt-5">Pens</h1>
      </div>
      <div className="row">
        <Link className="p-3" to="/pens">
          Approved Pens
        </Link>
        <Link className="p-3" to="/pens/unapproved">
          Unapproved Pens
        </Link>
      </div>
      <div className="row">
        <h1 className="mt-5">Nibs</h1>
      </div>
      <div className="row">
        <Link className="p-3" to="/nibs">
          Approved Nibs
        </Link>
        <Link className="p-3" to="/nibs/unapproved">
          Unapproved Nibs
        </Link>
      </div>
      <div className="row">
        <h1 className="mt-5">PenNibs</h1>
      </div>
      <div className="row">
        <Link className="p-3" to="/pen-nibs">
          Approved PenNibs
        </Link>
        <Link className="p-3" to="/pen-nibs/unapproved">
          Unapproved PenNibs
        </Link>
      </div>
      <div className="row">
        <h1 className="mt-5">Inks</h1>
      </div>
      <div className="row">
        <Link className="p-3" to="/inks">
          Approved Inks
        </Link>
        <Link className="p-3" to="/inks/unapproved">
          Unapproved Inks
        </Link>
        <Link className="p-3" to="/inks/new">
          Inks Insert
        </Link>
      </div>
      <div className="row">
        <h1 className="mt-5">Writing Samples</h1>
      </div>
      <div className="row">
        <Link className="p-3" to="/writing-samples">
          Approved Writing Samples
        </Link>
        <Link className="p-3" to="/writing-samples/unapproved">
          Unapproved Writing Samples
        </Link>
      </div>
    </div>
  );
}
