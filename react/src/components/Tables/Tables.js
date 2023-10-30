import React, { useState } from 'react';

import './Tables.css';

function Table({ data, onRowSelect }) {
    const [selectedRow, setSelectedRow] = useState(null);
  
    const handleRowClick = (index, rowData) => {
      setSelectedRow(index);
      // console.log('Row clicked:', rowData);
      if (onRowSelect) onRowSelect(rowData);
  };

    function formatShortDate(isoString) {
        const date = new Date(isoString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based, so +1
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }
  
    return (
      <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Created</th>
            </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(index, row)}
              className={selectedRow === index ? 'selected' : ''}
            >
                <td>{row.username}</td>
                <td>{row.title}</td>
                <td>{row.description}</td>
                <td>{row.price}</td>
                <td>{row.categories ? row.categories.join(', ') : 'N/A'}</td>
                <td>{formatShortDate(row.created_at) || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}

export default Table;
