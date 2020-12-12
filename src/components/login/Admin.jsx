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
        <Link className="p-3" to="/users/?approved=1">
          Approved Users
        </Link>
        <Link className="p-3" to="/users/?approved=0">
          Unapproved Users
        </Link>
      </div>
      {/* pens */}
      <div className="row">
        <h1 className="mt-5">Pens</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/pens/?approved=1">
          Approved Pens
        </Link>
        <Link className="p-3" to="/pens/?approved=0">
          Unapproved Pens
        </Link>
        <Link className="p-3" to="/pens/new">
          Pens Insert
        </Link>
        <Link className="p-3" to="/pens/edit">
          Pens Update
        </Link>
      </div>
      {/* nibs */}
      <div className="row">
        <h1 className="mt-5">Nibs</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/nibs/?approved=1">
          Approved Nibs
        </Link>
        <Link className="p-3" to="/nibs/?approved=0">
          Unapproved Nibs
        </Link>
        <Link className="p-3" to="/nibs/new">
          Nibs Insert
        </Link>
        <Link className="p-3" to="/nibs/edit">
          Nibs Update
        </Link>
      </div>
      {/* penNibs */}
      <div className="row">
        <h1 className="mt-5">PenNibs</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/pen-nibs/?PenNibs.approved=1">
          Approved PenNibs
        </Link>
        <Link className="p-3" to="/pen-nibs/?PenNibs.approved=0">
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
        <Link className="p-3" to="/inks/?approved=1">
          Approved Inks
        </Link>
        <Link className="p-3" to="/inks/?approved=0">
          Unapproved Inks
        </Link>
        <Link className="p-3" to="/inks/new">
          Inks Insert
        </Link>
        <Link className="p-3" to="/inks/edit">
          Inks Update
        </Link>
      </div>
      {/* papers */}
      <div className="row">
        <h1 className="mt-5">Papers</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/papers/?approved=1">
          Approved Papers
        </Link>
        <Link className="p-3" to="/papers/?approved=0">
          Unapproved Papers
        </Link>
        <Link className="p-3" to="/papers/new">
          Papers Insert
        </Link>
        <Link className="p-3" to="/papers/edit">
          Papers Update
        </Link>
      </div>
      {/* writingSamples */}
      <div className="row">
        <h1 className="mt-5">Writing Samples</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/writing-samples/?WritingSamples.approved=1">
          Approved Writing Samples
        </Link>
        <Link className="p-3" to="/writing-samples/?WritingSamples.approved=0">
          Unapproved Writing Samples
        </Link>
      </div>
      {/* colorReviews */}
      <div className="row">
        <h1 className="mt-5">Color Reviews</h1>
      </div>
      <div className="row border-bottom border-dark">
        <Link className="p-3" to="/color-reviews/?ColorReviews.approved=1">
          Approved Color Reviews
        </Link>
        <Link className="p-3" to="/color-reviews/?ColorReviews.approved=0">
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
        <Link className="p-3" to="/shading-reviews/?ShadingReviews.approved=1">
          Approved Shading Reviews
        </Link>
        <Link className="p-3" to="/shading-reviews/?ShadingReviews.approved=0">
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
        <Link className="p-3" to="/sheen-reviews/?SheenReviews.approved=1">
          Approved Sheen Reviews
        </Link>
        <Link className="p-3" to="/sheen-reviews/?SheenReviews.approved=0">
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
        <Link
          className="p-3"
          to="/feathering-reviews/?FeatheringReviews.approved=1"
        >
          Approved Feathering Reviews
        </Link>
        <Link
          className="p-3"
          to="/feathering-reviews/?FeatheringReviews.approved=0"
        >
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
        <Link className="p-3" to="/water-reviews/?WaterReviews.approved=1">
          Approved Waterproofness Reviews
        </Link>
        <Link className="p-3" to="/water-reviews/?WaterReviews.approved=0">
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
        <Link className="p-3" to="/drying-reviews/?DryingReviews.approved=1">
          Approved Drying Time Reviews
        </Link>
        <Link className="p-3" to="/drying-reviews/?DryingReviews.approved=0">
          Unapproved Drying Time Reviews
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
        <Link
          className="p-3"
          to="/transparency-reviews/?TransparencyReviews.approved=1"
        >
          Approved Transparency Reviews
        </Link>
        <Link
          className="p-3"
          to="/transparency-reviews/?TransparencyReviews.approved=0"
        >
          Unapproved Transparency Reviews
        </Link>
        <Link className="p-3" to="/transparency-reviews/new">
          Transparency Reviews Insert
        </Link>
      </div>
    </div>
  );
}
