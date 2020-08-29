import React, { Component } from 'react';
import API from '../../apis/API';

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
        <div>Download high res image</div>
        <div>Reviews</div>
        <div>Info</div>
        <img src={writingSample.url} alt="writing sample" />
      </div>
    );
  }
}

export default WritingSample;
