import React from "react";

export default function Datatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);
  return (
    <table cellPadding={0} cellSpacing={0}>
      <thead>
        <tr>
          {data[0] &&
            columns.map((heading, index) => <th key={index}>{heading}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, indexRow) => (
          <tr key={indexRow}>
            {columns.map((column, indexCol) => (
              <td key={indexCol}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
