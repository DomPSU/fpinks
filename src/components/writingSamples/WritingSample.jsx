import React, { Component } from 'react';
import API from '../../apis/API';
import { capitalize } from '../../util/util';

class WritingSample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writingSample: {},
    };

    this.getWritingSample = this.getWritingSample.bind(this);
  }

  componentDidMount() {
    this.getWritingSample();
  }

  getWritingSample() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `writing-samples/${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ writingSample: res.data[0] });
      })
      .catch((error) => console.log(error.response));
  }

  render() {
    const { writingSample } = this.state;
    console.log(this.state);
    return (
      <div className="container-fluid text-center">
        <div className="accordion" id="accordionExample">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left text-center"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Show High Resolution Image
                </button>
              </h2>
            </div>

            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <img
                src={writingSample.url}
                alt="writing sample"
                className="w-100"
              />
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingTwo">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left collapsed text-center"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Show Details
                </button>
              </h2>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-sm-6 col-lg-3 text-center p-1">
                      Ink: {capitalize(writingSample.ink_brand)}{' '}
                      {capitalize(writingSample.ink_name)}
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center p-1">
                      Pen: {capitalize(writingSample.pen_brand)}{' '}
                      {capitalize(writingSample.pen_model)}
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center p-1">
                      Nib: {capitalize(writingSample.nib_tune)}{' '}
                      {capitalize(writingSample.nib_size)}{' '}
                      {capitalize(writingSample.nib_grind)}
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center p-1">
                      Paper: {capitalize(writingSample.pen_brand)}{' '}
                      {capitalize(writingSample.pen_model)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingThree">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left collapsed text-center"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Show Reviews
                </button>
              </h2>
            </div>
            <div
              id="collapseThree"
              className="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionExample"
            >
              <div className="card-body">Coming Soon</div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingFour">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left collapsed text-center"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Downloads
                </button>
              </h2>
            </div>
            <div
              id="collapseFour"
              className="collapse"
              aria-labelledby="headingFour"
              data-parent="#accordionExample"
            >
              <div className="card-body">Coming Soon</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WritingSample;
