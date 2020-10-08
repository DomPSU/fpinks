import React, { Component } from 'react';
import API from '../../apis/API';
import { getIDToken } from '../../util/util';

class ColorReviewsUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      colorID: '',
      writingSampleID: '',
      approved: '',
      disableForm: true,
      serverResponse: '',
    };

    this.getColorReview = this.getColorReview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const originLength = window.location.origin.length;
    const editURL = window.location.href.slice(originLength);
    const getURL = editURL.replace('edit', 'admin');

    // if url contains query string, get Color Review
    if (getURL.indexOf('?') !== -1) {
      this.getColorReview(getURL);
    }
  }

  getColorReview(url) {
    const idToken = getIDToken();

    API.instance
      .post(url, { idToken })
      .then((res) => {
        console.log(res);
        this.setState({
          userID: res.data[0].user_id,
          colorID: res.data[0].color_id,
          writingSampleID: res.data[0].writing_sample_id,
          approved: res.data[0].approved,
          disableForm: false,
        });
      })
      .catch((error) => {
        this.setState({
          userID: '',
          colorID: '',
          writingSampleID: '',
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
        const { userID, colorID, writingSampleID } = this.state; // TODO should probably do this for PensUpdate

        if (id === 'userID' || id === 'colorID' || id === 'writingSampleID') {
          this.setState({ disableForm: true }, () => {
            this.getColorReview(
              `/color-reviews/admin/?ColorReviews.user_id=${userID}&ColorReviews.color_id=${colorID}&ColorReviews.writing_sample_id=${writingSampleID}`,
            );
          });
        }
      },
    );
  }

  handleSubmit(e) {
    const { userID, colorID, writingSampleID, approved } = this.state;
    const idToken = getIDToken();

    // TODO add frontend validation

    API.instance
      .post(
        `/color-reviews/edit/?user_id=${userID}&color_id=${colorID}&writing_sample_id=${writingSampleID}`,
        {
          idToken,
          userID,
          colorID,
          writingSampleID,
          approved,
        },
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
      userID,
      colorID,
      writingSampleID,
      approved,
      disableForm,
      serverResponse,
    } = this.state;

    return (
      <div className="container text-center">
        <h1 className="p-5">Update a Color Review</h1>
        <form>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="userID" className="p-3">
                User ID
                <input
                  type="text"
                  id="userID"
                  className="form-control"
                  onChange={this.handleChange}
                  value={userID}
                  disabled
                />
              </label>
              <label htmlFor="colorID" className="p-3">
                Color ID
                <input
                  type="text"
                  id="colorID"
                  className="form-control"
                  onChange={this.handleChange}
                  value={colorID}
                  disabled
                />
              </label>
              <label htmlFor="writingSampleID" className="p-3">
                Writing Sample ID
                <input
                  type="text"
                  id="writingSampleID"
                  className="form-control"
                  onChange={this.handleChange}
                  value={writingSampleID}
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

export default ColorReviewsUpdate;
