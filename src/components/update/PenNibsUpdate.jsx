import React, { Component } from 'react';
import API from '../../apis/API';
import { getIDToken } from '../../util/util';

class PenNibsUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      penID: '',
      nibID: '',
      approved: '',
      disableForm: true,
      serverResponse: '',
    };

    this.getPenNib = this.getPenNib.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const originLength = window.location.origin.length;
    const editURL = window.location.href.slice(originLength);
    const getURL = editURL.replace('edit/', '');

    // if url contains query string, get Shading Review
    if (getURL.indexOf('?') !== -1) {
      this.getPenNib(getURL);
    }
  }

  getPenNib(url) {
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
          nibID: res.data[0].nib_id,
          approved: res.data[0].approved,
          disableForm: false,
        });
      })
      .catch((error) => {
        this.setState({
          penID: '',
          nibID: '',
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
        const { penID, nibID } = this.state;

        if (id === 'penID' || id === 'nibID') {
          this.setState({ disableForm: true }, () => {
            this.getShadingReview(
              `/pen-nibs/?PenNibs.pen_id=${penID}&PenNibs.nib_id=${nibID}`,
            );
          });
        }
      },
    );
  }

  handleSubmit(e) {
    const { penID, nibID, approved } = this.state;

    // TODO add frontend validation
    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .put(
        `/pen-nibs/edit/?PenNibs.user_id=${penID}&PenNibs.nib_id=${nibID}`,
        {
          penID,
          nibID,
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
    const { penID, nibID, approved, disableForm, serverResponse } = this.state;

    return (
      <div className="container text-center">
        <h1 className="p-5">Update a Pen-Nib</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="userID" className="p-3">
                Pen ID
                <input
                  type="text"
                  id="penID"
                  className="form-control"
                  onChange={this.handleChange}
                  value={penID}
                  disabled
                />
              </label>
              <label htmlFor="writingSampleID" className="p-3">
                Nib ID
                <input
                  type="text"
                  id="nibID"
                  className="form-control"
                  onChange={this.handleChange}
                  value={nibID}
                  disabled
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

export default PenNibsUpdate;
