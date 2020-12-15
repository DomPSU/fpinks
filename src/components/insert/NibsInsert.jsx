import React, { Component } from 'react';
import API from '../../apis/API';
import { getIDToken } from '../../util/util';

class NibsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nibSize: '',
      nibGrind: '',
      nibTune: '',
      serverResponse: '',
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
    const { nibSize, nibGrind, nibTune } = this.state;

    // TODO add frontend validation

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .post(
        '/nibs',
        {
          nibSize,
          nibGrind,
          nibTune,
        },
        config,
      )
      .then((res) => {
        const serverResponse = document.getElementById('serverResponse');
        serverResponse.classList.remove('text-danger');
        serverResponse.classList.add('text-success');
        this.setState({
          serverResponse: res.statusText,
        });
      })
      .catch((error) => {
        const serverResponse = document.getElementById('serverResponse');
        serverResponse.classList.remove('text-success');
        serverResponse.classList.add('text-danger');
        this.setState({
          serverResponse: error.response.status,
        });
        console.log(error);
      });

    e.preventDefault();
  }

  render() {
    const { serverResponse } = this.state;

    return (
      <div className="container text-center">
        <h1 className="mt-5">Add a Nib</h1>
        <form>
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
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
        <h3 id="serverResponse">{serverResponse}</h3>
      </div>
    );
  }
}

export default NibsInsert;
