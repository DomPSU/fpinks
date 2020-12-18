import React, { Component } from 'react';
import API from '../../apis/API';
import { getIDToken } from '../../util/util';

class PensUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      penID: '',
      penBrand: '',
      penModel: '',
      approved: '',
      disableForm: true,
      serverResponse: '',
    };

    this.getPen = this.getPen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const originLength = window.location.origin.length;
    const editURL = window.location.href.slice(originLength);
    const getURL = editURL.replace('edit', '');

    // if url contains query string, get pen
    if (getURL.indexOf('?') !== -1) {
      this.getPen(getURL);
    }
  }

  getPen(url) {
    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .get(url, config)
      .then((res) => {
        this.setState({
          penID: res.data[0].pen_id,
          penBrand: res.data[0].brand,
          penModel: res.data[0].model,
          approved: res.data[0].approved,
          disableForm: false,
        });
      })
      .catch((error) => {
        this.setState({
          penBrand: '',
          penModel: '',
          approved: '',
          disableForm: true,
        });
        console.log(error);
      });
  }

  handleChange(e) {
    const { value } = e.target;
    const { id } = e.target;

    this.setState(
      {
        [id]: value,
        serverResponse: '',
      },
      () => {
        if (id === 'penID') {
          const { penID } = this.state;

          this.setState({ disableForm: true }, () => {
            this.getPen(`/pens/?pen_id=${penID}`);
          });
        }
      },
    );
  }

  handleSubmit(e) {
    const { penID, penBrand, penModel, approved } = this.state;

    // TODO add frontend validation
    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .put(
        `/pens/edit/${penID}`,
        {
          penBrand,
          penModel,
          approved,
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
    const {
      penID,
      penBrand,
      penModel,
      approved,
      disableForm,
      serverResponse,
    } = this.state;

    return (
      <div className="container text-center">
        <h1 className="p-5">Update a Pen</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="penID" className="p-3">
                Pen ID
                <input
                  type="text"
                  id="penID"
                  className="form-control"
                  onChange={this.handleChange}
                  value={penID}
                />
              </label>
              <label htmlFor="penBrand" className="p-3">
                Pen Brand
                <input
                  type="text"
                  id="penBrand"
                  className="form-control"
                  onChange={this.handleChange}
                  value={penBrand}
                  disabled={disableForm}
                />
              </label>
              <label htmlFor="penModel" className="p-3">
                Pen Model
                <input
                  type="text"
                  id="penModel"
                  className="form-control"
                  onChange={this.handleChange}
                  value={penModel}
                  disabled={disableForm}
                />
              </label>
              <label htmlFor="approved" className="p-3">
                Approved
                <input
                  type="text"
                  id="approved"
                  className="form-control"
                  onChange={this.handleChange}
                  value={approved}
                  disabled={disableForm}
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-1"
            onClick={this.handleSubmit}
            disabled={disableForm}
          >
            Submit
          </button>
        </form>
        <h3 id="serverResponse">{serverResponse}</h3>
      </div>
    );
  }
}

export default PensUpdate;
