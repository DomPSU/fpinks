import React, { Component } from 'react';
import API from '../../apis/API';
import { getIDToken } from '../../util/util';

class PapersInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paperBrand: '',
      paperName: '',
      paperStyle: '',
      paperLbs: '',
      paperGrams: '',
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
    const {
      paperBrand,
      paperName,
      paperStyle,
      paperLbs,
      paperGrams,
    } = this.state;

    // TODO add frontend validation

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .post(
        '/papers',
        {
          paperBrand,
          paperName,
          paperStyle,
          paperLbs,
          paperGrams,
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
        <h1 className="mt-5">Add a Paper</h1>
        <form className="bg-secondary">
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
        <h3 id="serverResponse">{serverResponse}</h3>
      </div>
    );
  }
}

export default PapersInsert;

// TODO add lbs/grams input and radio box for which one was entered
