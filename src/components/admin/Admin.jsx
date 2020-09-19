import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="container">
      {/* users */}
      <div className="row">
        <h1 className="mt-5">Users</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/users">
          Approved Users
        </Link>
        <Link className="p-3" to="/users/unapproved">
          Unapproved Users
        </Link>
      </div>
      {/* pens */}
      <div className="row">
        <h1 className="mt-5">Pens</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/pens">
          Approved Pens
        </Link>
        <Link className="p-3" to="/pens/unapproved">
          Unapproved Pens
        </Link>
        <Link className="p-3" to="/pens/new">
          Pens Insert
        </Link>
      </div>
      {/* nibs */}
      <div className="row">
        <h1 className="mt-5">Nibs</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/nibs">
          Approved Nibs
        </Link>
        <Link className="p-3" to="/nibs/unapproved">
          Unapproved Nibs
        </Link>
        <Link className="p-3" to="/nibs/new">
          Nibs Insert
        </Link>
      </div>
      {/* penNibs */}
      <div className="row">
        <h1 className="mt-5">PenNibs</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/pen-nibs">
          Approved PenNibs
        </Link>
        <Link className="p-3" to="/pen-nibs/unapproved">
          Unapproved PenNibs
        </Link>
        <Link className="p-3" to="/pen-nibs/new">
          PenNibs Insert
        </Link>
      </div>
      {/* inks */}
      <div className="row ">
        <h1 className="mt-5">Inks</h1>
      </div>
      <div className="row border-bottom border-dark">
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
      {/* papers */}
      <div className="row">
        <h1 className="mt-5">Papers</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/papers">
          Approved Papers
        </Link>
        <Link className="p-3" to="/papers/unapproved">
          Unapproved Papers
        </Link>
        <Link className="p-3" to="/papers/new">
          Papers Insert
        </Link>
      </div>
      {/* writingSamples */}
      <div className="row">
        <h1 className="mt-5">Writing Samples</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/writing-samples">
          Approved Writing Samples
        </Link>
        <Link className="p-3" to="/writing-samples/unapproved">
          Unapproved Writing Samples
        </Link>
      </div>
      {/* colorReviews */}
      <div className="row">
        <h1 className="mt-5">Color Reviews</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/color-reviews">
          Approved Color Reviews
        </Link>
        <Link className="p-3" to="/color-reviews/unapproved">
          Unapproved Color Reviews
        </Link>
        <Link className="p-3" to="/color-reviews/new">
          Color Reviews Insert
        </Link>
      </div>
      {/* shadingReviews */}
      <div className="row">
        <h1 className="mt-5">Shading Reviews</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/shading-reviews">
          Approved Shading Reviews
        </Link>
        <Link className="p-3" to="/shading-reviews/unapproved">
          Unapproved Shading Reviews
        </Link>
        <Link className="p-3" to="/shading-reviews/new">
          Shading Reviews Insert
        </Link>
      </div>
      {/* sheenReviews */}
      <div className="row">
        <h1 className="mt-5">Sheen Reviews</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/sheen-reviews">
          Approved Sheen Reviews
        </Link>
        <Link className="p-3" to="/sheen-reviews/unapproved">
          Unapproved Sheen Reviews
        </Link>
        <Link className="p-3" to="/sheen-reviews/new">
          Sheen Reviews Insert
        </Link>
      </div>
      {/* featheringReviews */}
      <div className="row">
        <h1 className="mt-5">Feathering Reviews</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/feathering-reviews">
          Approved Feathering Reviews
        </Link>
        <Link className="p-3" to="/feathering-reviews/unapproved">
          Unapproved Feathering Reviews
        </Link>
        <Link className="p-3" to="/feathering-reviews/new">
          Feathering Reviews Insert
        </Link>
      </div>
      {/* waterReviews */}
      <div className="row">
        <h1 className="mt-5">Water Reviews</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/water-reviews">
          Approved Waterproofness Reviews
        </Link>
        <Link className="p-3" to="/water-reviews/unapproved">
          Unapproved Waterproofness Reviews
        </Link>
        <Link className="p-3" to="/water-reviews/new">
          Waterproofness Reviews Insert
        </Link>
      </div>
      {/* dryingReviews */}
      <div className="row">
        <h1 className="mt-5">Drying Reviews</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/drying-reviews">
          Approved Drying Time Reviews
        </Link>
        <Link className="p-3" to="/drying-reviews/unapproved">
          Unapproved Drying TimeReviews
        </Link>
        <Link className="p-3" to="/drying-reviews/new">
          Drying Time Reviews Insert
        </Link>
      </div>
      {/* transparencyReviews */}
      <div className="row">
        <h1 className="mt-5">Transparency Reviews</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/transparency-reviews">
          Approved Transparency Reviews
        </Link>
        <Link className="p-3" to="/transparency-reviews/unapproved">
          Unapproved Transparency Reviews
        </Link>
        <Link className="p-3" to="/transparency-reviews/new">
          Transparency Reviews Insert
        </Link>
      </div>
    </div>
  );
}
