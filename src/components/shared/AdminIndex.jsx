import React, { Component } from 'react';
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
  }

  getIndex() {
    const originLength = window.location.origin.length;
    const url = window.location.href.slice(originLength);

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .get(url, config)
      .then((res) => {
        this.setState({ index: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { index } = this.state;

    let tableHeaders = [];
    if (index.length) {
      tableHeaders = Object.keys(index[0]);
      tableHeaders.push('edit');
    }

    // get model from url
    const originLength = window.location.origin.length;
    const url = window.location.href.slice(originLength);
    const model = url.split('/')[1];

    // get string query keys from models
    let queryKeys = [];
    if (model === 'pens') {
      queryKeys = ['pen_id'];
    } else if (model === 'nibs') {
      queryKeys = ['nib_id'];
    } else if (model === 'inks') {
      queryKeys = ['ink_id'];
    } else if (model === 'papers') {
      queryKeys = ['paper_id'];
    } else if (model === 'color-reviews') {
      queryKeys = ['user_id', 'color_id', 'writing_sample_id'];
    }

    const partialEditURL = `/${model}/edit/?`;

    if (
      model === 'pens' ||
      model === 'nibs' ||
      model === 'inks' ||
      model === 'papers'
    ) {
      index.forEach((row) => {
        let editURL = partialEditURL;

        queryKeys.forEach((key) => {
          editURL = editURL.concat(`${key}=${row[key]}&`);
        });

        editURL = editURL.substring(0, editURL.length - 1);
        // eslint-disable-next-line no-param-reassign
        row.edit = editURL;
      });
    }

    if (model === 'color-reviews') {
      index.forEach((row) => {
        let editURL = partialEditURL;

        queryKeys.forEach((key) => {
          editURL = editURL.concat(`ColorReviews.${key}=${row[key]}&`);
        });

        editURL = editURL.substring(0, editURL.length - 1);
        // eslint-disable-next-line no-param-reassign
        row.edit = editURL;
      });
    }

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
