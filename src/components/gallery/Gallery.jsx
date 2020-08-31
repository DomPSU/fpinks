import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../apis/API';
import './gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      query: '',
    };

    this.getIndex = this.getIndex.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.query = this.debounce(this.query, 1000); // TODO set debounce
  }

  componentDidMount() {
    this.getIndex();
  }

  getIndex() {
    API.instance
      .get('writing-samples')
      .then((res) => {
        this.setState({ results: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  async handleChange(event) {
    await this.setState({ query: event.target.value });
    this.query();
  }

  query() {
    console.log('query');
    const { query } = this.state;
    API.instance
      .get(`writing-samples/search/${query}`)
      .then((res) => {
        this.setState({ results: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  // TODO REFACTOR
  // eslint-disable-next-line class-methods-use-this
  debounce(fn, delay) {
    let timer = null;
    // eslint-disable-next-line func-names
    return function (...args) {
      const context = this;
      // eslint-disable-next-line no-unused-expressions
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  }

  render() {
    const { results, query } = this.state;

    const list = results.map((writingSample) => (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 text-center">
        <Link to={`/writing-samples/${writingSample.writing_sample_id}`}>
          <img
            src={writingSample.low_res_url}
            alt="writing sample"
            className="writing-sample"
          />
        </Link>
      </div>
    ));

    console.log(this.state); // TODO remove
    return (
      <div className="container-fluid">
        <div id="search-bar-div" className="fixed-top row">
          <input
            id="search-bar"
            type="text"
            value={query}
            onChange={this.handleChange}
          />
        </div>
        <div className="row d-flex flex-wrap align-items-center"> {list}</div>
      </div>
    );
  }
}

export default Gallery;
