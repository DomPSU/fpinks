import React, { Component } from 'react';
import API from '../../apis/API';
import colorsJSON from '../../constants/colors.json';
import { getIDToken } from '../../util/util';

class ColorReviewsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorOne: '',
      colorTwo: '',
      colorThree: '',
      writingSampleID: '',
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
    const { colorOne, colorTwo, colorThree, writingSampleID } = this.state;

    // TODO add frontend validation
    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .post(
        '/color-reviews',
        {
          colorOne,
          colorTwo,
          colorThree,
          writingSampleID,
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
        <h1 className="pt-5">Add a Color Review</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="colorReview" className="p-3 m-0">
                Color Review
                <div className="row">
                  <div className="col-12">
                    <select
                      className="form-control m-1"
                      id="colorOne"
                      onBlur={this.handleChange}
                    >
                      <option> </option>
                      {colorsJSON.names.map((color) => {
                        return <option>{color}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-12">
                    <select
                      className="form-control m-1"
                      id="colorTwo"
                      onBlur={this.handleChange}
                    >
                      <option> </option>
                      {colorsJSON.names.map((color) => {
                        return <option>{color}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-12">
                    <select
                      className="form-control m-1"
                      id="colorThree"
                      onBlur={this.handleChange}
                    >
                      <option> </option>
                      {colorsJSON.names.map((color) => {
                        return <option>{color}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </label>
              <label htmlFor="writingSampleID" className="p-3 m-0">
                Writing Sample ID
                <div className="row">
                  <div className="col-12">
                    <input
                      type="text"
                      id="writingSampleID"
                      className="form-control m-1 text-center"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary m-1"
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

export default ColorReviewsInsert;
