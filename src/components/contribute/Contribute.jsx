import React, { Component } from 'react';
import API from '../../apis/API';

class Contribute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writingSampleImage: '',
      inkBrand: '',
      inkName: '',
      penBrand: '',
      penModel: '',
      nibSize: '',
      nibGrind: '',
      nibTune: '',
      paperBrand: '',
      paperName: '',
      paperStyle: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const { id } = e.target;

    this.setState({
      [id]: value,
    });
  }

  handleFile(e) {
    this.setState({
      writingSampleImage: e.target.files[0],
    });
  }

  handleSubmit(e) {
    const {
      writingSampleImage,
      inkBrand,
      inkName,
      penBrand,
      penModel,
      nibSize,
      nibGrind,
      nibTune,
      paperBrand,
      paperName,
      paperStyle,
    } = this.state;

    // TODO add frontend validation

    // HACK
    const formData = new FormData();
    formData.append('writingSampleImage', writingSampleImage);
    formData.append('inkBrand', inkBrand);
    formData.append('inkName', inkName);
    formData.append('penBrand', penBrand);
    formData.append('penModel', penModel);
    formData.append('nibSize', nibSize);
    formData.append('nibGrind', nibGrind);
    formData.append('nibTune', nibTune);
    formData.append('paperBrand', paperBrand);
    formData.append('paperName', paperName);
    formData.append('paperStyle', paperStyle);

    API.instance
      .post('/writing-samples', formData)
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
                  onChange={this.handleFile}
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
                  <option>&lt; EF</option>
                  <option>EF</option>
                  <option>F</option>
                  <option>M</option>
                  <option>B</option>
                  <option>BB</option>
                  <option>3B</option>
                  <option>&gt; 3B</option>
                  <option>Flex</option>
                  <option>&lt; 0.5 mm</option>
                  <option>0.5 mm</option>
                  <option>0.6 mm</option>
                  <option>0.7 mm</option>
                  <option>0.8 mm</option>
                  <option>0.9 mm</option>
                  <option>1.0 mm</option>
                  <option>1.1 mm</option>
                  <option>1.2 mm</option>
                  <option>1.3 mm</option>
                  <option>1.4 mm</option>
                  <option>1.5 mm</option>
                  <option>&gt; 1.5 mm</option>
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
                  <option>Unknown</option>
                  <option>Regular</option>
                  <option>Stub</option>
                  <option>Italic</option>
                  <option>Left Oblique</option>
                  <option>Right Oblique</option>
                  <option>Architect</option>
                  <option>Calligraphy</option>
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
                Paper name
                <input
                  type="text"
                  id="paperName"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="paperStyle">
                Paper style
                <select
                  className="form-control"
                  id="paperStyle"
                  onBlur={this.handleChange}
                >
                  <option> </option>
                  <option>plain</option>
                  <option>lined</option>
                  <option>grid</option>
                  <option>dot</option>
                </select>
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
