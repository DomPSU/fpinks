import React from 'react';

export default function Developers() {
  return (
    <div className="container text-left">
      <h1 className="p-3 font-weight-bold text-center">API Documentation</h1>
      <h1 className="pt-3 font-weight-bold border-top border-dark">Pens</h1>
      <h3 className="">GET: /api/pens/?</h3>
      <h3 className="">SHOW: /api/pens/:penID</h3>
      <h3>JSON Keys: brand, model, created_at, updated_at</h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">Nibs</h1>
      <h3 className="">GET: /api/nibs/?</h3>
      <h3 className="">SHOW: /api/nibs/:nibID</h3>
      <h3>JSON Keys: size, grind, tune, created_at, updated_at</h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">Pen Nibs</h1>
      <h3 className="">GET: /api/pen-nibs/?</h3>
      <h3>JSON Keys: brand, model, size, grind, tune created_at, updated_at</h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">Inks</h1>
      <h3 className="">GET: /api/inks/?</h3>
      <h3 className="">SHOW: /api/inks/:inkID</h3>
      <h3>JSON Keys: brand, name, created_at, updated_at</h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">Papers</h1>
      <h3 className="">GET: /api/papers/?</h3>
      <h3 className="">SHOW: /api/papers/:paperID</h3>
      <h3>JSON Keys: brand, name, style, lbs, grams, created_at, updated_at</h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">
        Writing Samples
      </h1>
      <h3 className="">GET: /api/writing-samples/?</h3>
      <h3 className="">SHOW: /api/writing-samples/:writingSampleID</h3>
      <h3>
        JSON Keys: username, writing_sample_id, pen_brand, pen_model, nib_size,
        nib_grind, nib_tune, ink_brand, ink_name, paper_brand, paper_name,
        paper_style, created_at, updated_at, high_res_url, low_res_url
      </h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">
        Color Reviews
      </h1>
      <h3 className="">GET: /api/color-reviews/?</h3>
      <h3>
        JSON Keys: writing_sample_id, username, color, created_at, updated_at
      </h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">
        Shading Reviews
      </h1>
      <h3 className="">GET: /api/shading-reviews/?</h3>
      <h3>
        JSON Keys: writing_sample_id, username, amount, created_at, updated_at
      </h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">
        Sheen Reviews
      </h1>
      <h3 className="">GET: /api/sheen-reviews/?</h3>
      <h3>
        JSON Keys: writing_sample_id, username, color, amount, created_at,
        updated_at
      </h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">
        Feathering Review
      </h1>
      <h3 className="">GET: /api/feathering-reviews/?</h3>
      <h3>
        JSON Keys: writing_sample_id, username, amount, created_at, updated_at
      </h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">
        Waterproofness Reviews
      </h1>
      <h3 className="">GET: /api/water-reviews/?</h3>
      <h3>
        JSON Keys: writing_sample_id, username, waterproofness, created_at,
        updated_at
      </h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">
        Drying Time Reviews
      </h1>
      <h3 className="">GET: /api/drying-reviews/?</h3>
      <h3>
        JSON Keys: writing_sample_id, username, drying_time, created_at,
        updated_at
      </h3>
      <h1 className="pt-3 font-weight-bold border-top border-dark">
        Transparency Reviews
      </h1>
      <h3 className="">GET: /api/transparency-reviews/?</h3>
      <h3>
        JSON Keys: writing_sample_id, username, transparency, created_at,
        updated_at
      </h3>
    </div>
  );
}
