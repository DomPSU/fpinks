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

    let prefix;
    if (
      model === 'users' ||
      model === 'pens' ||
      model === 'nibs' ||
      model === 'inks' ||
      model === 'papers' ||
      model === 'writing-samples'
    ) {
      prefix = '';
    } else if (model === 'pen-nibs') {
      prefix = 'PenNibs.';
    } else if (model === 'color-reviews') {
      prefix = 'ColorReviews.';
    } else if (model === 'shading-reviews') {
      prefix = 'ShadingReviews.';
    } else if (model === 'sheen-reviews') {
      prefix = 'SheenReviews.';
    } else if (model === 'feathering-reviews') {
      prefix = 'FeatheringReviews.';
    } else if (model === 'water-reviews') {
      prefix = 'WaterReviews.';
    } else if (model === 'drying-reviews') {
      prefix = 'DryingReviews.';
    } else if (model === 'transparency-reviews') {
      prefix = 'TransparencyReviews.';
    }

    let queryKeys;
    if (model === 'users') {
      queryKeys = ['user_id'];
    } else if (model === 'pens') {
      queryKeys = ['pen_id'];
    } else if (model === 'nibs') {
      queryKeys = ['nib_id'];
    } else if (model === 'inks') {
      queryKeys = ['ink_id'];
    } else if (model === 'papers') {
      queryKeys = ['paper_id'];
    } else if (model === 'pen-nibs') {
      queryKeys = ['pen_id', 'nib_id'];
    } else if (model === 'writing-samples') {
      queryKeys = ['writing_sample_id'];
    } else if (model === 'color-reviews' || model === 'sheen-reviews') {
      queryKeys = ['user_id', 'color_id', 'writing_sample_id'];
    } else if (
      model === 'shading-reviews' ||
      model === 'feathering-reviews' ||
      model === 'water-reviews' ||
      model === 'drying-reviews' ||
      model === 'transparency-reviews'
    ) {
      queryKeys = ['user_id', 'writing_sample_id'];
    }

    const partialEditURL = `/${model}/edit/?`;

    index.forEach((row) => {
      let editURL = partialEditURL;

      queryKeys.forEach((key) => {
        editURL = editURL.concat(`${prefix}${key}=${row[key]}&`);
      });

      editURL = editURL.substring(0, editURL.length - 1);
      // eslint-disable-next-line no-param-reassign
      row.edit = editURL;
    });

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
