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
          API Approved Users
        </Link>
        <Link className="p-3" to="/users/admin/1">
          Admin Approved Users
        </Link>
        <Link className="p-3" to="/users/admin/0">
          Admin Unapproved Users
        </Link>
      </div>
      {/* pens */}
      <div className="row">
        <h1 className="mt-5">Pens</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/pens">
          API Approved Pens
        </Link>
        <Link className="p-3" to="/pens/admin/?approved=1">
          Admin Approved Pens
        </Link>
        <Link className="p-3" to="/pens/admin/?approved=0">
          Admin Unapproved Pens
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
          API Approved Nibs
        </Link>
        <Link className="p-3" to="/nibs/admin/1">
          Admin Approved Nibs
        </Link>
        <Link className="p-3" to="/nibs/admin/0">
          Admin Unapproved Nibs
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
          API Approved PenNibs
        </Link>
        <Link className="p-3" to="/pen-nibs/admin/1">
          Admin Approved PenNibs
        </Link>
        <Link className="p-3" to="/pen-nibs/admin/0">
          Admin Unapproved PenNibs
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
        <Link className="p-3" to="/inks/admin/1">
          Admin Approved Inks
        </Link>
        <Link className="p-3" to="/inks/admin/0">
          Admin Unapproved Inks
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
        <Link className="p-3" to="/papers/admin/1">
          Admin Approved Papers
        </Link>
        <Link className="p-3" to="/papers/admin/0">
          Admin Unapproved Papers
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
        <Link className="p-3" to="/writing-samples/admin/1">
          Admin Approved Writing Samples
        </Link>
        <Link className="p-3" to="/writing-samples/admin/0">
          Admin Unapproved Writing Samples
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
        <Link className="p-3" to="/color-reviews/admin/1">
          Admin Approved Color Reviews
        </Link>
        <Link className="p-3" to="/color-reviews/admin/0">
          Admin Unapproved Color Reviews
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
        <Link className="p-3" to="/shading-reviews/admin/1">
          Admin Approved Shading Reviews
        </Link>
        <Link className="p-3" to="/shading-reviews/admin/0">
          Admin Unapproved Shading Reviews
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
        <Link className="p-3" to="/sheen-reviews/admin/1">
          Admin Approved Sheen Reviews
        </Link>
        <Link className="p-3" to="/sheen-reviews/admin/0">
          Admin Unapproved Sheen Reviews
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
