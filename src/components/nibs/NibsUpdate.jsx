import React, { Component } from 'react';
import API from '../../apis/API';
import { getIDToken } from '../../util/util';

class NibsUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nibID: '',
      nibSize: '',
      nibGrind: '',
      nibTune: '',
      approved: '',
      disableForm: true,
      serverResponse: '',
    };

    this.getNib = this.getNib.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const originLength = window.location.origin.length;
    const editURL = window.location.href.slice(originLength);
    const getURL = editURL.replace('edit', 'admin');

    // if url contains query string, get nib
    if (getURL.indexOf('?') !== -1) {
      this.getNib(getURL);
    }
  }

  getNib(url) {
    const idToken = getIDToken();

    API.instance
      .post(url, { idToken })
      .then((res) => {
        this.setState({
          nibID: res.data[0].nib_id,
          nibSize: res.data[0].size,
          nibGrind: res.data[0].grind,
          nibTune: res.data[0].tune,
          approved: res.data[0].approved,
          disableForm: false,
        });
      })
      .catch((error) => {
        this.setState({
          nibID: '',
          nibSize: '',
          nibGrind: '',
          nibTune: '',
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
        if (id === 'nibID') {
          const { nibID } = this.state;

          this.setState({ disableForm: true }, () => {
            this.getNib(`/nibs/admin/?nib_id=${nibID}`);
          });
        }
      },
    );
  }

  handleSubmit(e) {
    const { nibID, nibSize, nibGrind, nibTune, approved } = this.state;
    const idToken = getIDToken();

    // TODO add frontend validation

    API.instance
      .post(`/nibs/edit/${nibID}`, {
        idToken,
        nibSize,
        nibGrind,
        nibTune,
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
      nibID,
      nibSize,
      nibGrind,
      nibTune,
      approved,
      disableForm,
      serverResponse,
    } = this.state;

    return (
      <div className="container text-center">
        <h1 className="p-5">Update a Nib</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="nibID" className="p-3">
                Nib ID
                <input
                  type="text"
                  id="nibID"
                  className="form-control"
                  onChange={this.handleChange}
                  value={nibID}
                />
              </label>
              <label htmlFor="nibSize" className="p-3">
                Nib Size
                <input
                  type="text"
                  id="nibSize"
                  className="form-control"
                  onChange={this.handleChange}
                  value={nibSize}
                  disabled={disableForm}
                />
              </label>
              <label htmlFor="nibGrind" className="p-3">
                Nib Grind
                <input
                  type="text"
                  id="nibGrind"
                  className="form-control"
                  onChange={this.handleChange}
                  value={nibGrind}
                  disabled={disableForm}
                />
              </label>
              <label htmlFor="nibTune" className="p-3">
                Nib Tune
                <input
                  type="text"
                  id="nibTune"
                  className="form-control"
                  onChange={this.handleChange}
                  value={nibTune}
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

export default NibsUpdate;
