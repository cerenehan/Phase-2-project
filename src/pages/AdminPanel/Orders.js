import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function Orders() {
  const [allRows, setAllRows] = useState([]); // Store all rows
  const [visibleRows, setVisibleRows] = useState(5); // Number of rows to display initially
  const [additionalRows, setAdditionalRows] = useState(10); // Number of rows to load when "See more" is clicked

  useEffect(() => {
    // Fetch and read data from the API endpoint
    fetch('http://localhost:3002/data')
      .then((response) => response.json())
      .then((data) => {
        // Modify the data to combine city and state
        const modifiedData = data.map(item => {
          const combinedLocation = `${item["Ship TO City"]}, ${item["Ship To State"]}`;
          return {
            ...item,
            "Ship TO Location": combinedLocation,
          };
        });
        setAllRows(modifiedData);
      })
      .catch((error) => console.error('Error loading data', error));
  }, []);

  function preventDefault(event) {
    event.preventDefault();
    setVisibleRows(visibleRows + additionalRows); // Load more rows when "See more" is clicked
  }

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship TO</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRows.slice(0, visibleRows).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.Date}</TableCell>
              <TableCell>{row.Name}</TableCell>
              <TableCell>{row['Ship TO Location']}</TableCell>
              <TableCell>{row['Payment Method']}</TableCell>
              <TableCell align="right">{row['Sale Amount']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {visibleRows < allRows.length && (
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See more orders
        </Link>
      )}
    </React.Fragment>
  );
}

export default Orders;
