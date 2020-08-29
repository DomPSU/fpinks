import React, { Component } from 'react';
import API from '../../apis/API';
import './gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: [],
    };

    this.getIndex = this.getIndex.bind(this);
  }

  componentDidMount() {
    this.getIndex();
  }

  getIndex() {
    API.instance
      .get('writing-samples')
      .then((res) => {
        this.setState({ index: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  render() {
    const { index } = this.state;

    const list = index.map((writingSample) => (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 text-center">
        <img
          src={writingSample.url}
          alt="writing sample"
          className="gallery-feed-list"
        />
      </div>
    ));

    return (
      <div className="container-fluid">
        <div className="row"> {list}</div>
      </div>
    );
  }
}

export default Gallery;
