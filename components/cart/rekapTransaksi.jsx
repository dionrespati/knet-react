/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React from 'react';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { number, bool } from 'prop-types';
import { currencyFormat } from '../../custom/contoh';
import TitleForm from '../layout/titleForm';

export default function RekapTransaksi({
  totalHarga,
  totalBv,
  totalItem,
  totalWeight,
  header,
  totalOngkir,
}) {
  console.log('RekapTransaksi rendered');
  const subheadInfo = {
    variant: 'subtitle1',
    sx: {
      width: '400px',
    },
  };

  const subheadValue = {
    variant: 'subtitle1',
    sx: {
      width: '200px',
    },
  };

  return (
    <Paper variant="outlined" sx={{ width: '100%', mb: 2 }}>
      {header === true && <TitleForm title="Rekap Transaksi" />}
      <List component="nav">
        <ListItem key="totHarga" divider>
          <Typography {...subheadInfo}>Total Harga</Typography>
          <Typography {...subheadValue} align="right">
            Rp.
            {currencyFormat(totalHarga)}
          </Typography>
        </ListItem>
        <ListItem key="totBV" divider>
          <Typography {...subheadInfo}>Total BV</Typography>
          <Typography {...subheadValue} align="right">
            {currencyFormat(totalBv)}
          </Typography>
        </ListItem>
        <ListItem key="totItem" divider>
          <Typography {...subheadInfo}>Total Item</Typography>
          <Typography {...subheadValue} align="right">
            {currencyFormat(totalItem)}
          </Typography>
        </ListItem>
        <ListItem key="totWeight">
          <Typography {...subheadInfo}>Total Berat (Kg)</Typography>
          <Typography {...subheadValue} align="right">
            {totalWeight}
          </Typography>
        </ListItem>
        <ListItem key="totOngkir">
          <Typography {...subheadInfo}>Biaya Kirim</Typography>
          <Typography {...subheadValue} align="right">
            {totalOngkir}
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );
}

RekapTransaksi.defaultProps = {
  totalHarga: 0,
  totalBv: 0,
  totalItem: 0,
  totalWeight: 0,
  header: false,
  totalOngkir: 0,
};

RekapTransaksi.propTypes = {
  totalHarga: number,
  totalBv: number,
  totalItem: number,
  totalWeight: number,
  header: bool,
  totalOngkir: number,
};
