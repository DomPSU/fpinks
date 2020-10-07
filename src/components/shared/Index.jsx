import React, { Component } from 'react';
import API from '../../apis/API';
import Table from './Table';

class Index extends Component {
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

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ index: res.data });
      })
      .catch((error) => console.log(error.response));
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

export default Index;
