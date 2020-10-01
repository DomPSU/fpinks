import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import API from '../../apis/API';
import Pagination from './Pagination';
import Help from './Help';
import './gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      query: '',
      currentPage: '',
      loading: true,
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
    const { queryStorage } = this.props;

    const savedQuery = sessionStorage.getItem(queryStorage);

    if (savedQuery !== null) {
      this.setState({ query: savedQuery });
    }
  }

  getCurrentPage() {
    const { pageStorage } = this.props;

    const savedCurrentPage = sessionStorage.getItem(pageStorage);

    if (savedCurrentPage !== null) {
      this.setState({ currentPage: savedCurrentPage });
    } else {
      this.setState({ currentPage: '1' });
    }
  }

  async handleQueryChange(event) {
    const query = event.target.value;

    this.setState({ query, currentPage: '1' });

    const { queryStorage, pageStorage } = this.props;

    sessionStorage.setItem(queryStorage, query);
    sessionStorage.setItem(pageStorage, '1');
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
    const { path } = this.props;

    API.instance
      .get(path + query)
      .then((res) => {
        this.setState({ results: res.data, loading: false });
      })
      .catch((error) => console.log(error.response));
  }

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
    const { results, query, currentPage, loading } = this.state;
    const { pageStorage, noResultsMessage } = this.props;

    if (currentPage !== '') {
      sessionStorage.setItem(pageStorage, currentPage);
    }

    const firstIndex = (parseInt(currentPage, 10) - 1) * 12;
    const lastIndex = parseInt(currentPage, 10) * 12;

    const list = results.slice(firstIndex, lastIndex).map((writingSample) => (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 text-center">
        <Link to={`/writing-samples/${writingSample.writing_sample_id}`}>
          <img
            src={writingSample.low_res_url}
            alt="writing sample"
            className="writing-sample"
          />
        </Link>
      </div>
    ));

    return (
      <div className="container-fluid h-100">
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

        {loading && (
          <div className="row justify-content-center margin-top">
            <ReactLoading
              className="pt-5"
              type="bars"
              color="#0a58ca"
              height={100}
              width={100}
            />
          </div>
        )}

        {!loading &&
          list.length === 0 &&
          query.toLowerCase() !== 'help' &&
          query.toLowerCase() !== "'help'" && (
            <div className="row margin-top">
              <h3 className="col text-center mt-5 pt-5">{noResultsMessage}</h3>
            </div>
          )}

        {!loading &&
          list.length !== 0 &&
          query.toLowerCase() !== 'help' &&
          query.toLowerCase() !== "'help'" && (
            <div
              id="list"
              className="row d-flex flex-wrap align-items-center margin-top"
            >
              {list}
            </div>
          )}

        {!loading &&
          list.length !== 0 &&
          query.toLowerCase() !== 'help' &&
          query.toLowerCase() !== "'help'" && (
            <Pagination
              currentPage={currentPage}
              handleIncrementClick={this.handleIncrementClick}
              handleDecrementClick={this.handleDecrementClick}
            />
          )}

        {((!loading && query.toLowerCase() === 'help') ||
          query.toLowerCase() === "'help'") && <Help />}
      </div>
    );
  }
}

Gallery.propTypes = {
  queryStorage: PropTypes.string.isRequired,
  pageStorage: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  noResultsMessage: PropTypes.string.isRequired,
};

export default Gallery;
