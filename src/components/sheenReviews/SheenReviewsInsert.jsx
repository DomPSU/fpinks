import React, { Component } from 'react';
import API from '../../apis/API';
import sheensJSON from '../../constants/sheens.json';
import colorsJSON from '../../constants/colors.json';
import { getIDToken } from '../../util/util';

class SheenReviewsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      color: '',
      writingSampleID: '',
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
    const { color, amount, writingSampleID } = this.state;

    // TODO add frontend validation

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .post(
        '/sheen-reviews',
        {
          color,
          amount,
          writingSampleID,
        },
        config,
      )
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
        <h1 className="pt-5">Add a Sheen Review</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="sheenReview" className="p-3 m-0">
                Sheen Review
                <div className="row">
                  <div className="col-12">
                    <select
                      className="form-control m-1"
                      id="amount"
                      onBlur={this.handleChange}
                    >
                      <option> </option>
                      {sheensJSON.names.map((amount) => {
                        return <option>{amount}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-12">
                    <select
                      className="form-control m-1"
                      id="color"
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
      </div>
    );
  }
}

export default SheenReviewsInsert;
