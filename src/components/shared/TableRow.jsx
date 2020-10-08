import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TableRow extends Component {
  render() {
    const { row } = this.props;
    const rowClasses = 'border border-dark p-1 align-middle';

    const formattedRows = Object.entries(row).map(([key, value]) => {
      if (key === 'low_res_url') {
        return <a href={value}>low res writing sample</a>;
      }

      if (key === 'high_res_url') {
        return <a href={value}>high res writing sample</a>;
      }

      if (key === 'original_url') {
        return <a href={value}>original writing sample</a>;
      }

      if (key === 'edit') {
        return <Link to={value}>edit</Link>;
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
