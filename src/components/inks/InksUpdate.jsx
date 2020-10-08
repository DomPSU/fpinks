import React, { Component } from 'react';
import API from '../../apis/API';
import { getIDToken } from '../../util/util';

class InksUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inkID: '',
      inkBrand: '',
      inkName: '',
      approved: '',
      disableForm: true,
      serverResponse: '',
    };

    this.getInk = this.getInk.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const originLength = window.location.origin.length;
    const editURL = window.location.href.slice(originLength);
    const getURL = editURL.replace('edit', 'admin');

    // if url contains query string, get ink
    if (getURL.indexOf('?') !== -1) {
      this.getInk(getURL);
    }
  }

  getInk(url) {
    const idToken = getIDToken();

    API.instance
      .post(url, { idToken })
      .then((res) => {
        this.setState({
          inkID: res.data[0].ink_id,
          inkBrand: res.data[0].brand,
          inkName: res.data[0].name,
          approved: res.data[0].approved,
          disableForm: false,
        });
      })
      .catch((error) => {
        this.setState({
          inkBrand: '',
          inkName: '',
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
        if (id === 'inkID') {
          const { inkID } = this.state;

          this.setState({ disableForm: true }, () => {
            this.getInk(`/inks/admin/?ink_id=${inkID}`);
          });
        }
      },
    );
  }

  handleSubmit(e) {
    const { inkID, inkBrand, inkName, approved } = this.state;
    const idToken = getIDToken();

    // TODO add frontend validation

    API.instance
      .post(`/inks/edit/${inkID}`, {
        idToken,
        inkBrand,
        inkName,
        approved,
      })
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
      inkID,
      inkBrand,
      inkName,
      approved,
      disableForm,
      serverResponse,
    } = this.state;

    return (
      <div className="container text-center">
        <h1 className="p-5">Update an Ink</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="inkID" className="p-3">
                Ink ID
                <input
                  type="text"
                  id="inkID"
                  className="form-control"
                  onChange={this.handleChange}
                  value={inkID}
                />
              </label>
              <label htmlFor="inkBrand" className="p-3">
                Ink Brand
                <input
                  type="text"
                  id="inkBrand"
                  className="form-control"
                  onChange={this.handleChange}
                  value={inkBrand}
                  disabled={disableForm}
                />
              </label>
              <label htmlFor="inkName" className="p-3">
                Ink Name
                <input
                  type="text"
                  id="inkName"
                  className="form-control"
                  onChange={this.handleChange}
                  value={inkName}
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

export default InksUpdate;
