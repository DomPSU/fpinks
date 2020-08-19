import React, { Component } from 'react';
import API from '../../apis/API';
import Table from '../shared/Table';

class WritingSamplesIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: [],
      selected: null,
    };

    this.getUsers = this.getWritingSamples.bind(this);
  }

  componentDidMount() {
    this.getWritingSamples();
  }

  getWritingSamples() {
    API.instance
      .get('/writing-samples')
      .then((res) => {
        this.setState({ index: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  render() {
    const { index } = this.state;
    const { selected } = this.state;

    const tableHeaders = index.length ? Object.keys(index[0]) : [];

    return (
      <div>
        <div className="container-fluid text-center">
          <Table
            headers={tableHeaders}
            rows={index}
            select
            selected={selected}
            handleSelect={this.handleSelect}
          />
        </div>
      </div>
    );
  }
}
export default WritingSamplesIndex;
