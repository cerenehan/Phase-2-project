import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function Orders() {
  const [allRows, setAllRows] = useState([]);
  const [visibleRows, setVisibleRows] = useState(5); 
  const [additionalRows, setAdditionalRows] = useState(10); 

  useEffect(() => {
    fetch('http://localhost:3002/data')
      .then((response) => response.json())
      .then((data) => {
        const modifiedData = data.map(item => {
          const city = item["Ship TO City"] || '';
          const state = item["Ship to State"] || '';
          const combinedLocation = `${city}, ${state}`;
          const last4Digits = item["Credit Card Number"].slice(-4);
          return {
            ...item,
            "Ship TO Location": combinedLocation,
            "Payment Method": `${item["Payment Method"]} ***${last4Digits}`,
          };
        });
        modifiedData.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setAllRows(modifiedData);
      })
      .catch((error) => console.error('Error loading data', error));
  }, []);

  function preventDefault(event) {
    event.preventDefault();
    setVisibleRows(visibleRows + additionalRows);
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
