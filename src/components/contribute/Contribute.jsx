import React, { Component } from 'react';
import API from '../../apis/API';

class Contribute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inkBrand: '',
      inkName: '',
      penBrand: '',
      penModel: '',
      nibSize: '',
      nibGrind: '',
      nibTune: '',
      paperBrand: '',
      paperName: '',
      paperWeight: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const { id } = e.target;

    this.setState({
      [id]: value,
    });
  }

  handleSubmit(e) {
    const {
      inkBrand,
      inkName,
      penBrand,
      penModel,
      nibSize,
      nibGrind,
      nibTune,
      paperBrand,
      paperName,
      paperWeight,
    } = this.state;

    // TODO add frontend validation

    API.instance
      .post('/writing-samples', {
        inkBrand,
        inkName,
        penBrand,
        penModel,
        nibSize,
        nibGrind,
        nibTune,
        paperBrand,
        paperName,
        paperWeight,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    e.preventDefault();
  }

  render() {
    console.log(this.state);
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
                <input
                  type="text"
                  id="inkBrand"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="inkName">
                Ink Name
                <input
                  type="text"
                  id="inkName"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="penBrand">
                Pen Brand
                <input
                  type="text"
                  id="penBrand"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="penModel">
                Pen Model
                <input
                  type="text"
                  id="penModel"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="nibSize">
                Nib Size
                <select
                  className="form-control"
                  id="nibSize"
                  onBlur={this.handleChange}
                >
                  <option> </option>
                  <option>Unmarked</option>
                  <option>EF+</option>
                  <option>EF</option>
                  <option>F</option>
                  <option>M</option>
                  <option>B</option>
                  <option>BB</option>
                  <option>3B</option>
                  <option>3B+</option>
                  <option>Flex</option>
                </select>
              </label>
              <label htmlFor="nibGrind">
                Nib Grind
                <select
                  className="form-control"
                  id="nibGrind"
                  onBlur={this.handleChange}
                >
                  <option> </option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </label>
              <label htmlFor="nibTune">
                Nib Tune
                <select
                  className="form-control"
                  id="nibTune"
                  onBlur={this.handleChange}
                >
                  <option> </option>
                  <option>factory</option>
                  <option>custom</option>
                  <option>unknown</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="paperBrand">
                Paper Brand
                <input
                  type="text"
                  id="paperBrand"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="paperName">
                Paper Name
                <input
                  type="text"
                  id="paperName"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="paperWeight">
                Paper weight
                <input
                  type="text"
                  id="paperWeight"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Contribute;

// TODO add radio input for g/m^2 or lbs
// TODO refactor input groups into a react component?
// TODO nibSize, nibGrind, and nibTune options in json file
