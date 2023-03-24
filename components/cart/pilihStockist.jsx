/* eslint-disable no-console */
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import { useAppContext } from '../../context/app';

/* import getPriceListOngkir from '../../pages/api/servis-kirim/getPriceList'; */

function PilihStockist() {
  const { cart, setCart } = useAppContext();

  const {
    stockistReffCode,
    stockistReffInfo: infoPilihanStk,
    filteredStk,
  } = cart;

  console.log('component PilihStockist rendered');

  const buttonStyle = { textTransform: 'capitalize', fontSize: '15px' };

  const [keySearchStk, setKeySearchStk] = useState('');

  const cariStk = (e) => {
    const { value } = e.target;
    setKeySearchStk(value.toLowerCase());
  };

  let hasilPencarianStk = filteredStk;

  hasilPencarianStk = filteredStk.filter((item) =>
    item.searchKey.includes(keySearchStk)
  );

  async function handlePilihStockist(objParam) {
    const { officeCode, warehouse } = objParam;
    const infoStk = `${officeCode} - ${warehouse}`;

    /* const paramEkspedisi = {
      berat: totalWeight,
      harga: totalHarga,
      id_member: login.userlogin,
      addressType,
      whcd: warehouseCode,
    };

    console.log('function getPriceListOngkir invoked');

    const {
      errCode: kodeError, data: datax, message: pesanError,
    } = await getPriceListOngkir(paramEkspedisi);

    console.log({ kodeError, datax, pesanError });
    if (kodeError !== '000') {
      alert(pesanError);
      return;
    } */
    setCart({
      ...cart,
      stockistReffCode: officeCode,
      stockistReffInfo: infoStk,
    });
  }

  return (
    <>
      <Grid item md={12} xs={12} sx={{ padding: 1 }}>
        <TextField
          fullWidth
          name="keySearchStk"
          value={keySearchStk}
          label="Filter Pencarian Stockist"
          onChange={cariStk}
          sx={{ marginBottom: 1 }}
        />
      </Grid>
      <Divider />
      <Grid item md={12} xs={12} sx={{ padding: 1 }}>
        {infoPilihanStk && (
          <Alert
            severity="success"
            sx={{ height: '33px', padding: 0.5, marginBottom: 1 }}
          >
            <AlertTitle>{infoPilihanStk}</AlertTitle>
          </Alert>
        )}
        <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
          <Card>
            {hasilPencarianStk &&
              hasilPencarianStk.map((whx) => {
                const {
                  officeCode: kodeStk,
                  warehouse: namaStk,
                  jarak,
                  alamat: addressStk,
                } = whx;
                const nilaiMarginAlamatStk = addressStk.length > 40 ? 2 : 0;
                const infoStk = `${kodeStk} - ${namaStk}`;

                return (
                  <>
                    <CardContent>
                      <Grid
                        item
                        container
                        xs={12}
                        md={12}
                        direction="row"
                        sx={{ padding: 0, marginBottom: 0 }}
                      >
                        <Grid
                          item
                          md={1}
                          xs={1}
                          sx={{ padding: 0, height: '30px' }}
                        >
                          <PersonIcon />
                        </Grid>
                        <Grid
                          item
                          md={11}
                          xs={11}
                          sx={{ padding: 0, height: '30px' }}
                        >
                          <Typography variant="subtitle2">{`${infoStk.toUpperCase()}`}</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={12}
                        md={12}
                        direction="row"
                        sx={{ padding: 0, marginBottom: nilaiMarginAlamatStk }}
                      >
                        <Grid
                          item
                          md={1}
                          xs={1}
                          sx={{ padding: 0, height: '30px' }}
                        >
                          <MapsHomeWorkOutlinedIcon />
                        </Grid>
                        <Grid
                          item
                          md={11}
                          xs={11}
                          sx={{ padding: 0, height: '30px' }}
                        >
                          <Typography variant="subtitle2">
                            {addressStk.toUpperCase()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={12}
                        md={12}
                        direction="row"
                        sx={{ padding: 0, marginBottom: 0 }}
                      >
                        <Grid
                          item
                          md={1}
                          xs={1}
                          sx={{ padding: 0, height: '30px' }}
                        >
                          <LocalShippingIcon />
                        </Grid>
                        <Grid
                          item
                          md={11}
                          xs={11}
                          sx={{ padding: 0, height: '30px' }}
                        >
                          <Typography variant="subtitle2">{`${jarak} Km`}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Stack direction="row" spacing={1}>
                        {stockistReffCode === kodeStk && (
                          <Alert
                            severity="success"
                            sx={{ height: '33px', padding: 0.5 }}
                          >
                            <AlertTitle>
                              Stockist sudah dipilih&nbsp;&nbsp;&nbsp;
                            </AlertTitle>
                          </Alert>
                        )}

                        {stockistReffCode !== kodeStk && (
                          <Button
                            startIcon={<CheckIcon />}
                            size="small"
                            color="success"
                            variant="contained"
                            sx={buttonStyle}
                            onClick={() => handlePilihStockist(whx)}
                          >
                            Pilih Stockist
                          </Button>
                        )}
                      </Stack>
                    </CardActions>
                    <Divider />
                  </>
                );
              })}
          </Card>
        </Paper>
      </Grid>
    </>
  );
}

export default PilihStockist;
