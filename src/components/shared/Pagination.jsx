import React from 'react';
import './pagination.css';

export default function Pagination(props) {
  const { currentPage, handleIncrementClick, handleDecrementClick } = props;

  return (
    <div className="form-inline justify-content-center">
      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={handleDecrementClick}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-chevron-right"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>
      <input
        className="text-center form-control text-white bg-primary"
        type="text"
        value={currentPage}
        id="currentPage"
        readOnly
      />
      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={handleIncrementClick}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-chevron-right"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
  );
}

/*
  // REFACTOR
  handleIncrementPageClick() {
    if (parseInt(this.props.currentPage) === this.getLastPageNumber()) {
      return;
    } else if (this.withinPageRange(parseInt(this.props.currentPage))) {
      this.props.onIncrementPageClick();
    } else {
      return;
    }
  }

  // REFACTOR
  handleDecrementPageClick() {
    if (parseInt(this.props.currentPage) === 1) {
      return;
    } else if (this.withinPageRange(parseInt(this.props.currentPage))) {
      this.props.onDecrementPageClick();
    } else {
      return;
    }
  }

  // REFACTOR
  getLastPageNumber() {
    if (this.props.listLength === 0) {
      return 1;
    }
    return Math.ceil(this.props.listLength / this.props.maxPageLength);
  }

  // REFACTOR
  withinPageRange(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= this.getLastPageNumber()) {
      return true;
    }
    return false;
  }

  // REFACTOR
  handlePageChange(e) {
    if (e.target.value > this.getLastPageNumber()) {
      this.props.onPageChange(this.getLastPageNumber());
    } else if (e.target.value === '') {
      this.props.onPageChange(e.target.value);
    } else if (this.withinPageRange(parseInt(e.target.value))) {
      this.props.onPageChange(parseInt(e.target.value));
    } else {
      this.props.onPageChange(1);
    }
  }
  */
