/* eslint-disable no-console */
import React from 'react';
import { func } from 'prop-types';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { currencyFormat } from '../../custom/contoh';
import TitleForm from '../layout/titleForm';

import { useAppContext } from '../../context/app';
import AddReduceButton from './addReduceButton';
import MemberBV from './memberBV';
import RekapTransaksi from './rekapTransaksi';

export default function ListCartListItem({ setStep }) {
  const { cart, login } = useAppContext();

  console.log('Halaman Cart List Item component invoked..');

  const { data: isiCart, priceCode, totalBv, totalItem, totalWeight } = cart;

  const buttonStyle = { textTransform: 'capitalize', fontSize: '18px' };

  let totalSubProduk = 0;
  let subTotal = 0;
  const jumRecord = isiCart.length;
  let nowRecord = 0;

  const style = {
    height: 100,
    width: 100,
  };

  const gridPrd = {
    height: 'auto',
    padding: 0.2,
    marginLeft: 2,
  };

  const nextStep = () => {
    setStep((step) => step + 1);
  };

  return (
    <>
      <Grid item md={6} xs={12} sx={{ p: 1 }}>
        <Paper variant="outlined">
          <TitleForm title="List Produk" />
          <List component="nav">
            {isiCart &&
              isiCart.map((item) => {
                const {
                  prdnm,
                  qty,
                  priceWestDist,
                  priceEastDist,
                  priceWestCust,
                  priceEastCust,
                  bv,
                  imageUrl,
                } = item;
                if (login !== null && priceCode === '12W4') {
                  subTotal = qty * priceWestDist;
                }

                if (login !== null && priceCode === '12E4') {
                  subTotal = qty * priceEastDist;
                }

                if (login === null && priceCode === '12W4') {
                  subTotal = qty * priceWestCust;
                }

                if (login === null && priceCode === '12E4') {
                  subTotal = qty * priceEastCust;
                }
                const subTotalBv = qty * bv;
                totalSubProduk += subTotal;
                nowRecord += 1;
                return (
                  <ListItem key={nowRecord} divider={nowRecord < jumRecord}>
                    <Grid
                      item
                      container
                      xs={12}
                      md={12}
                      direction="row"
                      sx={{ padding: 1 }}
                    >
                      <Grid item xs={12} md={2} sx={{ padding: 1 }}>
                        <CardMedia
                          component="img"
                          image={imageUrl}
                          alt="Paella dish"
                          style={style}
                        />
                      </Grid>
                      <Grid item container xs={12} md={10}>
                        <Grid item xs={12} md={12} sx={gridPrd}>
                          <Typography variant="subtitle2">{prdnm}</Typography>
                        </Grid>
                        <Grid item xs={12} md={12} sx={gridPrd}>
                          <Typography variant="subtitle2">
                            Sub Total BV : {currencyFormat(subTotalBv)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} sx={gridPrd}>
                          <Typography variant="subtitle2">
                            Sub Total Harga : Rp. {currencyFormat(subTotal)}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={12}
                          sx={gridPrd}
                          alignItems="flex-end"
                        >
                          <AddReduceButton item={item} qty={qty} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            <ListItem>
              <Link href="/product">
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  color="warning"
                  sx={buttonStyle}
                >
                  Tambah Produk
                </Button>
              </Link>
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item md={5} xs={12} sx={{ p: 1 }}>
        <RekapTransaksi
          totalHarga={totalSubProduk}
          totalBv={totalBv}
          totalItem={totalItem}
          totalWeight={totalWeight}
          totalOngkir={0}
          header
        />
        <MemberBV nextStep={nextStep} />
        {/* <MemberBV2 /> */}
      </Grid>
    </>
  );
}

ListCartListItem.propTypes = {
  setStep: func,
};

ListCartListItem.defaultProps = {
  setStep: () => {},
};
