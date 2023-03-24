/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  number, string,
} from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';

const createData = (name, nilai) => {
  return { name, nilai };
};

const TableProduct = ({ prdnm, subTotal, subTotalBv }) => {
  const formatTotalHarga = `Rp. ${subTotal}`;
  const rows = [
    createData('Sub Total BV', subTotalBv),
    createData('Sub Total Harga', formatTotalHarga),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{prdnm}</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.nilai}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableProduct.defaultProps = {
  subTotal: 0,
  subTotalBv: 0,
  prdnm: '',
};

TableProduct.propTypes = {
  subTotal: number,
  subTotalBv: number,
  prdnm: string,
};

export default TableProduct;
