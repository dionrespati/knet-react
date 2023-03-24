/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-extra-semi */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { func } from 'prop-types';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

import Button from '@mui/material/Button';
import { useAppContext } from '../../context/app';
// eslint-disable-next-line import/no-named-as-default-member
import ListArea from './listArea';
import TitleForm from '../layout/titleForm';
import ListAlamat from './listAlamat';

export default function DeliveryOption({ setStep }) {
  console.log('komponen DeliveryOption rendered');

  const { cart, setCart } = useAppContext();
  const { sentTo: sentType } = cart;
  const [sentTo, setSentTo] = useState(true);

  const buttonStyle = { textTransform: 'capitalize', fontSize: '18px' };

  const backToCart = () => {
    setStep(0);
  };

  const pilihPembayaran = () => {
    setStep(2);
  };

  const pilihPengiriman = () => {
    setSentTo(!sentTo);
    const nilai = sentTo ? '2' : '1';
    const sentToArr = {
      ...cart,
      sentTo: nilai,
    };
    setCart(sentToArr);
  };

  return (
    <>
      <Grid item md={6} xs={12} sx={{ p: 1 }}>
        <Paper variant="outlined">
          <TitleForm title="Pengiriman" />
          <List component="nav">
            <ListItem key="pilKirim2">
              <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={sentType === '2'}
                        onChange={pilihPengiriman}
                        name="sentTo"
                      />
                    }
                    label={
                      sentType === '1'
                        ? 'Diambil di Stockist'
                        : 'Dikirim ke Alamat'
                    }
                  />
                </FormGroup>
              </FormControl>
            </ListItem>
            {sentType === '1' && <ListArea />}

            {sentType === '2' && <ListAlamat />}
          </List>
          <ListItem key="pilKirim3">
            <Button
              size="large"
              variant="contained"
              fullWidth
              sx={buttonStyle}
              onClick={backToCart}
              color="warning"
            >
              Ubah Keranjang Belanja
            </Button>
          </ListItem>
          <ListItem key="pilKirim4">
            <Button
              size="large"
              variant="contained"
              fullWidth
              sx={buttonStyle}
              onClick={pilihPembayaran}
              disabled
            >
              Pilih Pembayaran
            </Button>
          </ListItem>
        </Paper>
      </Grid>
      <Grid item md={6} xs={12} sx={{ p: 1 }} />
    </>
  );
}

DeliveryOption.propTypes = {
  setStep: func.isRequired,
};
