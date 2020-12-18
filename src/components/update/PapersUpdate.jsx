import React, { Component } from 'react';
import API from '../../apis/API';
import { getIDToken } from '../../util/util';

class PapersUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paperID: '',
      paperBrand: '',
      paperName: '',
      paperStyle: '',
      lbs: '',
      grams: '',
      approved: '',
      disableForm: true,
      serverResponse: '',
    };

    this.getPaper = this.getPaper.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const originLength = window.location.origin.length;
    const editURL = window.location.href.slice(originLength);
    const getURL = editURL.replace('edit', '');

    // if url contains query string, get paper
    if (getURL.indexOf('?') !== -1) {
      this.getPaper(getURL);
    }
  }

  getPaper(url) {
    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .get(url, config)
      .then((res) => {
        this.setState({
          paperID: res.data[0].paper_id,
          paperBrand: res.data[0].brand,
          paperName: res.data[0].name,
          paperStyle: res.data[0].style,
          lbs: res.data[0].lbs,
          grams: res.data[0].grams,
          approved: res.data[0].approved,
          disableForm: false,
        });
      })
      .catch((error) => {
        this.setState({
          paperBrand: '',
          paperName: '',
          paperStyle: '',
          lbs: '',
          grams: '',
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
        if (id === 'paperID') {
          const { paperID } = this.state;

          this.setState({ disableForm: true }, () => {
            this.getPaper(`/papers/?paper_id=${paperID}`);
          });
        }
      },
    );
  }

  handleSubmit(e) {
    const {
      paperID,
      paperBrand,
      paperName,
      paperStyle,
      lbs,
      grams,
      approved,
    } = this.state;
    const idToken = getIDToken();

    // TODO add frontend validation

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .put(
        `/papers/edit/${paperID}`,
        {
          idToken,
          paperBrand,
          paperName,
          paperStyle,
          lbs,
          grams,
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
      paperID,
      paperBrand,
      paperName,
      paperStyle,
      lbs,
      grams,
      approved,
      disableForm,
      serverResponse,
    } = this.state;

    return (
      <div className="container text-center">
        <h1 className="p-5">Update a Paper</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="paperID" className="p-3">
                Paper ID
                <input
                  type="text"
                  id="paperID"
                  className="form-control"
                  onChange={this.handleChange}
                  value={paperID}
                />
              </label>
              <label htmlFor="paperBrand" className="p-3">
                Paper Brand
                <input
                  type="text"
                  id="paperBrand"
                  className="form-control"
                  onChange={this.handleChange}
                  value={paperBrand}
                  disabled={disableForm}
                />
              </label>
              <label htmlFor="paperName" className="p-3">
                Paper Name
                <input
                  type="text"
                  id="paperName"
                  className="form-control"
                  onChange={this.handleChange}
                  value={paperName}
                  disabled={disableForm}
                />
              </label>
              <label htmlFor="paperStyle" className="p-3">
                Paper Style
                <input
                  type="text"
                  id="paperStyle"
                  className="form-control"
                  onChange={this.handleChange}
                  value={paperStyle}
                  disabled={disableForm}
                />
              </label>
              <label htmlFor="lbs" className="p-3">
                Lbs
                <input
                  type="text"
                  id="lbs"
                  className="form-control"
                  onChange={this.handleChange}
                  value={lbs}
                  disabled={disableForm}
                />
              </label>
              <label htmlFor="grams" className="p-3">
                Grams
                <input
                  type="text"
                  id="grams"
                  className="form-control"
                  onChange={this.handleChange}
                  value={grams}
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

export default PapersUpdate;
