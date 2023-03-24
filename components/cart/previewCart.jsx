/* eslint-disable no-console */
import React from 'react';
import { number, shape, string, arrayOf } from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { currencyFormat } from '../../custom/contoh';

export default function PreviewCart({ isiCart, priceCode, login }) {
  console.log('PreviewCart is rendered...');
  let totalQty = 0;
  let totalPrice = 0;

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 600,
        bgcolor: 'background.paper',
      }}
    >
      {isiCart &&
        isiCart.map((item) => {
          const {
            prdcd,
            prdnm,
            qty,
            priceWestDist,
            priceEastDist,
            priceWestCust,
            priceEastCust,
            imageUrl,
          } = item;
          const isiJumlah = `Jumlah : ${qty}`;
          totalQty += qty;

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
            <ListItem key={prdcd} divider>
              <ListItemAvatar>
                <Avatar src={imageUrl} variant="square" />
              </ListItemAvatar>
              <ListItemText primary={prdnm} secondary={isiJumlah} />
            </ListItem>
          );
        })}
      <ListItem key="total">
        <ListItemAvatar>
          <ShoppingCartCheckoutIcon />
        </ListItemAvatar>
        <ListItemText
          primary={`Total Qty : ${totalQty}`}
          secondary={`Total Harga : Rp ${currencyFormat(totalPrice)}`}
        />
      </ListItem>
    </List>
  );
}

PreviewCart.defaultProps = {
  login: null,
  priceCode: '12W4',
  isiCart: [],
};

PreviewCart.propTypes = {
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
    }).isRequired
  ),
  priceCode: string,
  login: shape({
    userlogin: string,
    loginname: string,
  }),
};
