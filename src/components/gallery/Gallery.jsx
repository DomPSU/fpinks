import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to={`/writing-samples/${writingSample.writing_sample_id}`}>
          <img
            src={writingSample.url}
            alt="writing sample"
            className="writing-sample"
          />
        </Link>
      </div>
    ));

    return (
      <div className="container-fluid">
        <div id="search-bar-div" className="fixed-top row">
          <input id="search-bar" />
        </div>
        <div className="row d-flex flex-wrap align-items-center"> {list}</div>
      </div>
    );
  }
}

export default Gallery;
