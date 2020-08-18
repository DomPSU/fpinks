import React, { Component } from 'react';

class TableRow extends Component {
  render() {
    const { row } = this.props;
    const rowClasses = 'border border-dark p-1 align-middle';

    // format row values
    const formattedRows = Object.entries(row).map(([key, value]) => {
      if (key === 'createdAt' || key === 'updatedAt') {
        return value.slice(0, 10);
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
