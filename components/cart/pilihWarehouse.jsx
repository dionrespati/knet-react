/* eslint-disable import/no-named-as-default */
/* eslint-disable no-alert */
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
import PhoneIcon from '@mui/icons-material/Phone';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { updateRekapTrans } from '../../custom/contoh';
import { useAppContext } from '../../context/app';

import getStockist from '../../pages/api/servis-kirim/getStockist';
import getPriceListOngkir from '../../pages/api/servis-kirim/getPriceList';

function PilihWarehouse() {
  const { cart, setCart, login } = useAppContext();
  const {
    data: isiDataCart,
    addressCode,
    listWarehouse,
    warehouseCode,
    postcodeLatitute: addrLatitude,
    listStkReff,
    postcodeLongitude: addrLongitude,
    warehouseInfo: infoPilihanWH,
    totalWeight,
    totalHarga,
    addressType,
  } = cart;

  console.log('component PilihWarehouse rendered');

  const buttonStyle = { textTransform: 'capitalize', fontSize: '15px' };

  const [keySearchWH, setKeySearchWH] = useState('');

  let hasilPencarianWH = listWarehouse;

  const cariWH = (e) => {
    const { value } = e.target;
    setKeySearchWH(value.toLowerCase());
  };

  hasilPencarianWH = listWarehouse.filter((item) =>
    item.searchKey.includes(keySearchWH)
  );

  async function handlePilihWH(objParam, infoWarehouse) {
    const { officeCode, pricecode: priceCode } = objParam;

    console.log({ officeCode, priceCode });

    const paramEkspedisi = {
      berat: totalWeight,
      harga: totalHarga,
      id_member: login.userlogin,
      addressType,
      whcd: officeCode,
    };

    console.log('function getPriceListOngkir invoked');
    const {
      errCode: kodeErrorOngkir,
      data: dataOngkir,
      message: pesanErrorOngkir,
    } = await getPriceListOngkir(paramEkspedisi);

    console.log({ kodeErrorOngkir, dataOngkir, pesanErrorOngkir });
    if (kodeErrorOngkir !== '000') {
      alert(pesanErrorOngkir);
    }

    let newArrCart = {};
    if (listStkReff.length === 0) {
      console.log('masuk if');
      const paramSend = {
        id_address: addressCode,
        kodepos_lat: addrLatitude,
        kodepos_long: addrLongitude,
      };

      console.log('function getStockist invoked');
      console.log({ paramSend });

      const {
        errCode: kodeError,
        data: datax,
        message: pesanError,
      } = await getStockist(paramSend);

      console.log({ kodeError, datax, pesanError });
      if (kodeError !== '000') {
        alert(pesanError);
        return;
      }

      newArrCart = {
        ...cart,
        listStkReff: datax,
        warehouseCode: officeCode,
        warehouseInfo: infoWarehouse,
        listKurir: dataOngkir,
      };
      setCart(newArrCart);
    } else {
      console.log('masuk else');
      let listFilteredStokis = listStkReff
        .sort((a, b) => a.jarak - b.jarak)
        .filter((e) => e.pricecode === priceCode);

      const tempListFilteredStokis = listFilteredStokis;
      // console.log({listFilteredStokis, hasilPencarianStk});
      const checkStk = listFilteredStokis.filter(
        (e) => e.officeCode === officeCode
      );
      let tempStk = '';
      let tempStkInfo = '';
      if (checkStk.length > 0) {
        listFilteredStokis = checkStk;
        tempStk = checkStk[0].officeCode;
        tempStkInfo = `${checkStk[0].officeCode} - ${checkStk[0].warehouse}`;
      }

      const newArr = updateRekapTrans(isiDataCart, login, priceCode);
      // setFilteredStk(listFilteredStokis);
      newArrCart = {
        ...cart,
        totalItem: newArr.totalItem,
        totalHarga: newArr.totalHarga,
        totalBv: newArr.totalBv,
        totalWeight: newArr.totalWeight,
        priceCode,
        warehouseCode: officeCode,
        warehouseInfo: infoWarehouse,
        stockistReffCode: tempStk,
        stockistReffInfo: tempStkInfo,
        filteredStk: tempListFilteredStokis,
        listKurir: dataOngkir,
      };
      console.log({ newArrCart });
      setCart(newArrCart);
    }

    /*
    const paramEkspedisi = {
      berat: totalWeight,
      harga: totalHarga,
      id_member: login.userlogin,
      addressType,
      whcd: officeCode,
    };

    console.log('function getPriceListOngkir invoked');

    const {
      errCode: kodeError, data: datax, message: pesanError,
    } = await getPriceListOngkir(paramEkspedisi);

    console.log({ kodeError, datax, pesanError });
    if (kodeError !== '000') {
      alert(pesanError);
    }

    newArrCart = {
      ...cart,
      ...newArrCart,
      listKurir: datax,
    };

    console.log({ newArrCart });
    setCart(newArrCart);
    */
  }

  return (
    <>
      <Grid item md={12} xs={12} sx={{ padding: 1 }}>
        <TextField
          fullWidth
          name="keySearchWh"
          value={keySearchWH}
          label="Filter Pencarian Warehouse"
          onChange={cariWH}
          sx={{ marginBottom: 1 }}
        />
      </Grid>
      <Grid item md={12} xs={12} sx={{ padding: 1 }}>
        {infoPilihanWH && (
          <Alert
            severity="success"
            sx={{ height: '33px', padding: 0.5, marginBottom: 1 }}
          >
            <AlertTitle>{infoPilihanWH}</AlertTitle>
          </Alert>
        )}
        <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
          <Card>
            {hasilPencarianWH &&
              hasilPencarianWH.map((whx) => {
                const {
                  officeCode: whCode,
                  warehouse: whName,
                  jarak,
                  telp: whPhone,
                  provinsi: warehouseProvince,
                  kabupaten: warehouseKabupaten,
                  kecamatan: warehouseKecamatan,
                  kelurahan: warehouseKelurahan,
                } = whx;
                const areaWH = `${warehouseProvince} - ${warehouseKabupaten} - ${warehouseKecamatan} - ${warehouseKelurahan}`;
                const upperCaseAreaWH = areaWH.toUpperCase();
                const infoWarehouse = `${whCode} - ${whName}`;

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
                          <Typography variant="subtitle2">{`${infoWarehouse.toUpperCase()}`}</Typography>
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
                      <Grid
                        item
                        container
                        xs={12}
                        md={12}
                        direction="row"
                        sx={{ padding: 0 }}
                      >
                        <Grid
                          item
                          md={1}
                          xs={1}
                          sx={{ padding: 0, height: '30px' }}
                        >
                          <PhoneIcon />
                        </Grid>
                        <Grid
                          item
                          md={11}
                          xs={11}
                          sx={{ padding: 0, height: '30px' }}
                        >
                          <Typography variant="subtitle2">{`${whPhone}`}</Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        container
                        xs={12}
                        md={12}
                        direction="row"
                        sx={{ padding: 0 }}
                      >
                        <Grid
                          item
                          md={1}
                          xs={1}
                          sx={{ padding: 0, height: '30px' }}
                        >
                          <LocationSearchingOutlinedIcon />
                        </Grid>
                        <Grid
                          item
                          md={11}
                          xs={11}
                          sx={{ padding: 0, height: '30px' }}
                        >
                          <Typography variant="subtitle2">
                            {upperCaseAreaWH}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Stack direction="row" spacing={1}>
                        {warehouseCode === whCode && (
                          <Alert
                            severity="success"
                            sx={{ height: '33px', padding: 0.5 }}
                          >
                            <AlertTitle>
                              Warehouse sudah dipilih&nbsp;&nbsp;&nbsp;
                            </AlertTitle>
                          </Alert>
                        )}

                        {warehouseCode !== whCode && (
                          <Button
                            startIcon={<CheckIcon />}
                            size="small"
                            color="success"
                            variant="contained"
                            sx={buttonStyle}
                            onClick={() => handlePilihWH(whx, infoWarehouse)}
                          >
                            Pilih Warehouse
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

export default PilihWarehouse;
