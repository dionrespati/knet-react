/* eslint-disable react/function-component-definition */
import React from 'react';
import { shape, string, number } from 'prop-types';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import AddReduceButton from '../cart/addReduceButton';
import CartButtonSet from '../cart/cartButtonSet';
import { currencyFormat } from '../../custom/contoh';

export default function ProductList({ item, login }) {
  console.log('Halaman product Item Component invoked..');

  const {
    prdnm,
    priceWestDist,
    priceEastDist,
    imageUrl,
    priceEastCust,
    priceWestCust,
  } = item;

  const infoHargaA =
    login !== null
      ? `Rp ${currencyFormat(priceWestDist)}`
      : `Rp ${currencyFormat(priceWestCust)}`;
  const infoHargaB =
    login !== null
      ? `Rp ${currencyFormat(priceEastDist)}`
      : `Rp ${currencyFormat(priceEastCust)}`;

  let variantSize = 'h6';
  const panjang = prdnm.length;
  if (panjang > 15 && panjang <= 20) {
    variantSize = 'subtitle1';
  } else if (panjang > 20) {
    variantSize = 'subtitle2';
  }

  const isiQty = 0;

  return (
    <Grid item xs={12} md={3} justifyContent="space-between">
      <Card variant="outlined" sx={{ maxWidth: 320, mb: 3 }}>
        <CardContent>
          <Typography
            sx={{ textAlign: 'center' }}
            variant={variantSize}
            color="text.secondary"
          >
            <b>{prdnm}</b>
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Paella dish"
          sx={{ width: '100', height: '50' }}
        />
        <CardContent>
          <Grid container spacing={0.05} sx={{ textAlign: 'center' }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Wilayah A
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {infoHargaA}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Wilayah B
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {infoHargaB}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        {isiQty === 0 && (
          <CardActions>
            <CartButtonSet item={item} />
          </CardActions>
        )}

        {isiQty > 0 && (
          <CardActions disableSpacing>
            <AddReduceButton item={item} qty={isiQty} />
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}

ProductList.propTypes = {
  item: shape({
    prdcd: string,
    prdnm: string,
    priceWestDist: number,
    imageUrl: string,
  }).isRequired,
  login: shape({
    userlogin: string,
    loginname: string,
  }).isRequired,
};
