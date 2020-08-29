import React, { Component } from 'react';

class TableRow extends Component {
  render() {
    const { row } = this.props;
    const rowClasses = 'border border-dark p-1 align-middle';

    const formattedRows = Object.entries(row).map(([key, value]) => {
      if (key === 'url') {
        return <a href={value}>writing sample</a>;
      }
      return value;
    });

    return (
      <tr>
        {formattedRows.map((formattedRow) => {
          return <td className={rowClasses}>{formattedRow}</td>;
        })}
      </tr>
    );
  }
}

export default TableRow;
