import React, { Component } from 'react';
import API from '../../apis/API';

class PensInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      penBrand: '',
      penModel: '',
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
    const { penBrand, penModel } = this.state;

    // TODO add frontend validation

    API.instance
      .post('/pens', {
        penBrand,
        penModel,
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
        <h1 className="mt-5">Add a Pen</h1>
        <form className="bg-secondary">
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

export default PensInsert;