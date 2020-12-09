import React, { Component } from 'react';
import API from '../../apis/API';
import { getIDToken } from '../../util/util';

class InksInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inkBrand: '',
      inkName: '',
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
    const { inkBrand, inkName } = this.state;

    // TODO add frontend validation
    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .post(
        '/inks',
        {
          inkBrand,
          inkName,
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
        <h1 className="mt-5">Add an Ink</h1>
        <form className="bg-secondary">
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

export default InksInsert;
