import React, { Component } from 'react';
import API from '../../apis/API';
import watersJSON from '../../constants/waters.json';

class WaterReviewsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waterproofness: '',
      writingSampleID: '',
      userID: '',
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
    const { waterproofness, writingSampleID, userID } = this.state;

    // TODO add frontend validation

    // TODO get user ID from login instead of html input
    // Also delete html view for user id input

    API.instance
      .post('/water-reviews', {
        waterproofness,
        writingSampleID,
        userID,
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
        <h1 className="pt-5">Add a Waterproofness Review</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="waterReview" className="p-3 m-0">
                Waterproofness Review
                <div className="row">
                  <div className="col-12">
                    <select
                      className="form-control m-1"
                      id="waterproofness"
                      onBlur={this.handleChange}
                    >
                      <option> </option>
                      {watersJSON.names.map((waterproofness) => {
                        return <option>{waterproofness}</option>;
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
              <label htmlFor="userID" className="p-3 m-0">
                User ID
                <div className="row">
                  <div className="col-12">
                    <input
                      type="text"
                      id="userID"
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

export default WaterReviewsInsert;