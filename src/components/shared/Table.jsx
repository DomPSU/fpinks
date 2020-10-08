import React from 'react';
import TableRow from './TableRow';

// This is a function instead of a class because it does not have state
// This function only processes the passed props from a parent componenet
// The parent component will deal with state and pass it to children when needed
// This function can be used with any Parent that passes it the correct props
export default function Table(props) {
  // set "headers" and "rows" from props
  // these props may be passed from any parent component e.g. UserIndex.js
  const { headers, rows } = props;

  return (
    <div className="row justify-content-center">
      <div className="col-auto">
        <table className="table-responsive p-1">
          <thead>
            <tr>
              {headers.map((header) => {
                return (
                  <th className="border border-dark p-1 align-middle">
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              return <TableRow row={row} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
