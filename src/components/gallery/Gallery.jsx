import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../apis/API';
import Pagination from '../shared/Pagination';
import './gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      query: '',
      currentPage: '',
    };

    this.getQuery = this.getQuery.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleIncrementClick = this.handleIncrementClick.bind(this);
    this.handleDecrementClick = this.handleDecrementClick.bind(this);
    this.query = this.debounce(this.query, 300);
  }

  componentDidMount() {
    this.getQuery();
    this.getCurrentPage();
    this.query();
  }

  getQuery() {
    const savedQuery = sessionStorage.getItem('query');

    if (savedQuery !== null) {
      this.setState({ query: savedQuery });
    }
  }

  getCurrentPage() {
    const savedCurrentPage = sessionStorage.getItem('gallery page');

    if (savedCurrentPage !== null) {
      this.setState({ currentPage: savedCurrentPage });
    } else {
      this.setState({ currentPage: '1' });
    }

    console.log(this.state);
  }

  async handleQueryChange(event) {
    const query = event.target.value;

    this.setState({ query, currentPage: '1' });

    sessionStorage.setItem('query', query);
    sessionStorage.setItem('gallery page', '1');
    this.query();
  }

  async handleIncrementClick() {
    const { currentPage, results } = this.state;

    const maxPage = String(Math.floor(results.length / 12) + 1);

    if (currentPage === maxPage) {
      return;
    }

    await this.setState((state) => ({
      currentPage: String(parseInt(state.currentPage, 10) + 1),
    }));
    window.scrollTo(0, 0);
  }

  async handleDecrementClick() {
    const { currentPage } = this.state;

    if (currentPage === '1') {
      return;
    }

    await this.setState((state) => ({
      currentPage: String(parseInt(state.currentPage, 10) - 1),
    }));
  }

  query() {
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
    const { results, query, currentPage } = this.state;

    if (currentPage !== '') {
      sessionStorage.setItem('gallery page', currentPage);
    }

    const firstIndex = (parseInt(currentPage, 10) - 1) * 12;
    const lastIndex = parseInt(currentPage, 10) * 12;

    // TODO
    const list = results.slice(firstIndex, lastIndex).map((writingSample) => (
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

    console.log('STATE');
    console.log(this.state); // TODO remove
    console.log('LIST');
    console.log(list[0]);
    return (
      <div className="container-fluid">
        <div id="search-bar-div" className="fixed-top row">
          <input
            className="form-control"
            id="search-bar"
            type="text"
            value={query}
            onChange={this.handleQueryChange}
            placeholder="Type 'help' for search instructions."
          />
        </div>
        <div id="list" className="row d-flex flex-wrap align-items-center">
          {' '}
          {list}
        </div>
        <Pagination
          currentPage={currentPage}
          handleIncrementClick={this.handleIncrementClick}
          handleDecrementClick={this.handleDecrementClick}
        />
      </div>
    );
  }
}

export default Gallery;
