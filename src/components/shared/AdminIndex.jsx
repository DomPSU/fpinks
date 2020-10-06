import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../../apis/API';
import Table from './Table';
import { getIDToken } from '../../util/util';

class AdminIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: [],
    };

    this.getIndex = this.getIndex.bind(this);
  }

  componentDidMount() {
    this.getIndex();
    // eslint-disable-next-line react/destructuring-assignment
  }

  // eslint-disable-next-line class-methods-use-this
  getIndex() {
    const originLength = window.location.origin.length;
    const url = window.location.href.slice(originLength);

    const idToken = getIDToken();

    API.instance
      .post(url, { idToken })
      .then((res) => {
        this.setState({ index: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { index } = this.state;

    const tableHeaders = index.length ? Object.keys(index[0]) : [];

    return (
      <div>
        <div className="container-fluid text-center">
          <Table headers={tableHeaders} rows={index} />
        </div>
      </div>
    );
  }
}

export default AdminIndex;
