import React, { Component } from 'react';
import API from '../../apis/API';
import transparenciesJSON from '../../constants/transparencies.json';

class TransparencyReviewsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transparency: '',
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
    const { transparency, writingSampleID, userID } = this.state;

    // TODO add frontend validation

    // TODO get user ID from login instead of html input
    // Also delete html view for user id input

    API.instance
      .post('/transparency-reviews', {
        transparency,
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
        <h1 className="pt-5">Add a Transparency Review</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="transparencyReview" className="p-3 m-0">
                Transparency Review
                <div className="row">
                  <div className="col-12">
                    <select
                      className="form-control m-1"
                      id="transparency"
                      onBlur={this.handleChange}
                    >
                      <option> </option>
                      {transparenciesJSON.names.map((transparency) => {
                        return <option>{transparency}</option>;
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

export default TransparencyReviewsInsert;
