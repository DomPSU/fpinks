import React, { Component } from 'react';
import API from '../../apis/API';
import dryingTimesJSON from '../../constants/dryingTimes.json';
import { getIDToken } from '../../util/util';

class DryingReviewsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dryingTime: '',
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
    const { dryingTime, writingSampleID } = this.state;

    // TODO add frontend validation

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .post(
        '/drying-reviews',
        {
          dryingTime,
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
        <h1 className="pt-5">Add a Drying Time Review</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="dryingReview" className="p-3 m-0">
                Drying Time Review
                <div className="row">
                  <div className="col-12">
                    <select
                      className="form-control m-1"
                      id="dryingTime"
                      onBlur={this.handleChange}
                    >
                      <option> </option>
                      {dryingTimesJSON.names.map((dryingTime) => {
                        return <option>{dryingTime}</option>;
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

export default DryingReviewsInsert;
