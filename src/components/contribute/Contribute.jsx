import React from 'react';

export default function Contribute() {
  return (
    <div className="container text-center">
      <h1 className="mt-5">Add a Writing Sample</h1>
      <form className="bg-secondary">
        <div className="row">
          <div className="col-lg-12 col-lg-offset-12">
            <label htmlFor="writingSampleImage">
              Image
              <input
                type="file"
                id="writingSampleImage"
                className="form-control"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-lg-offset-12">
            <label htmlFor="inkBrand">
              Ink Brand
              <input type="text" id="inkBrand" className="form-control" />
            </label>
            <label htmlFor="inkName">
              Ink Name
              <input type="text" id="inkBrand" className="form-control" />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-lg-offset-12">
            <label htmlFor="penBrand">
              Pen Brand
              <input type="text" id="penBrand" className="form-control" />
            </label>
            <label htmlFor="penModel">
              Pen Model
              <input type="text" id="penModel" className="form-control" />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-lg-offset-12">
            <label htmlFor="nibSize">
              Nib Size
              <input type="text" id="nibSize" className="form-control" />
            </label>
            <label htmlFor="nibGrind">
              Nib Grind
              <input type="text" id="nibGrind" className="form-control" />
            </label>
            <label htmlFor="nibTune">
              Nib Tune
              <input type="text" id="nibTune" className="form-control" />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-lg-offset-12">
            <label htmlFor="paperBrand">
              Paper Brand
              <input type="text" id="paperBrand" className="form-control" />
            </label>
            <label htmlFor="paperName">
              Paper Name
              <input type="text" id="paperName" className="form-control" />
            </label>
            <label htmlFor="paperName">
              Paper Name
              <input type="text" id="paperName" className="form-control" />
            </label>
            <label htmlFor="paperWeight">
              Paper weight
              <input type="text" id="paperWeight" className="form-control" />
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

// TODO add radio input for g/m^2 or lbs
// TODO refactor input groups into a react component?
