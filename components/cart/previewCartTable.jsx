import React from 'react';
import {
  number, shape, string, arrayOf,
} from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { currencyFormat } from '../../custom/contoh';

function PreviewCartTable({ isiCart, priceCode, login }) {
  let totalQty = 0;
  let totalPrice = 0;
  let totalBv = 0;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700, maxWidth: '100%' }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 300 }}>Nama Produk</TableCell>
            <TableCell align="right">Qty.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {isiCart && isiCart.map((item) => {
            const {
              prdcd, prdnm, qty, priceWestDist, priceEastDist, priceWestCust, priceEastCust, bv,
            } = item;
            totalQty += qty;
            totalBv += qty * bv;

            if (login !== null && priceCode === '12W4') {
              totalPrice += qty * priceWestDist;
            }

            if (login !== null && priceCode === '12E4') {
              totalPrice += qty * priceEastDist;
            }

            if (login === null && priceCode === '12W4') {
              totalPrice += qty * priceWestCust;
            }

            if (login === null && priceCode === '12E4') {
              totalPrice += qty * priceEastCust;
            }

            return (
              <TableRow key={prdcd}>
                <TableCell>{prdnm}</TableCell>
                <TableCell align="right">{currencyFormat(qty)}</TableCell>
              </TableRow>
            );
          })}
          <TableRow key="totalQty">
            <TableCell>Total Qty</TableCell>
            <TableCell align="right">{currencyFormat(totalQty)}</TableCell>
          </TableRow>
          <TableRow key="totalBv">
            <TableCell>Total BV</TableCell>
            <TableCell align="right">{currencyFormat(totalBv)}</TableCell>
          </TableRow>
          <TableRow key="totalPrice">
            <TableCell>Total Harga</TableCell>
            <TableCell align="right">
              Rp.
              {currencyFormat(totalPrice)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PreviewCartTable.defaultProps = {
  login: null,
  priceCode: '12W4',
  isiCart: [],
};

PreviewCartTable.propTypes = {
  isiCart: arrayOf(
    shape({
      prdcd: string.isRequired,
      prdnm: string.isRequired,
      qty: number.isRequired,
      priceWestDist: number.isRequired,
      priceEastDist: number.isRequired,
      priceWestCust: number.isRequired,
      priceEastCust: number.isRequired,
      bv: number.isRequired,
      imageUrl: string.isRequired,
      weight: number.isRequired,
    }).isRequired,
  ),
  priceCode: string,
  login: shape({
    userlogin: string,
    loginname: string,
  }),
};

export default PreviewCartTable;
