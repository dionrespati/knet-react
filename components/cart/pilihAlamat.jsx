/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

import getWarehouse from '../../pages/api/servis-kirim/getWarehouse';
import getListAddress from '../../pages/api/member/listAddress';
import { useAppContext } from '../../context/app';

function PilihAlamat() {
  const { cart, setCart, login } = useAppContext();
  const { addressCode, infoPilAlamat, listAddressMember } = cart;

  console.log('component PilihAlamat rendered');

  const getSavedAddressMember = async () => {
    console.log('function getSavedAddressMember invoked');
    const { userlogin } = login;
    const { errCode, data, message } = await getListAddress(userlogin);
    console.log({ errCode, data, message });
    if (errCode === '000') {
      console.log({ data });
      setCart({
        ...cart,
        listAddressMember: data,
      });
    }
  };

  useEffect(() => {
    if (listAddressMember.length === 0) {
      getSavedAddressMember();
    }
  }, []);

  const buttonStyle = { textTransform: 'capitalize', fontSize: '15px' };

  const [pilAlamat, setPilAlamat] = useState([]);
  const [keySearchAddr, setKeySearchAddr] = useState('');

  let hasilPencarianAlamat = listAddressMember;
  hasilPencarianAlamat = listAddressMember.filter((item) =>
    item.searchKey.includes(keySearchAddr)
  );

  const cariAlamat = (e) => {
    const { value } = e.target;
    setKeySearchAddr(value.toLowerCase());
  };

  const handlePilihAlamat = async (objParam) => {
    const {
      addressCode: addrCodeVal,
      jenis_alamat: addressType,
      receiverName,
      postcodeLatitute,
      postcodeLongitude,
    } = objParam;

    // if(listWarehouse.length === 0) {
    const paramSend = {
      id_address: addrCodeVal,
      id_member: login.userlogin,
      jenis_alamat: addressType,
      ispromo: 0,
      kodepos_lat: postcodeLatitute,
      kodepos_long: postcodeLongitude,
    };

    console.log('function getWarehouse invoked');
    console.log({ paramSend });

    const {
      errCode: kodeError,
      data: datax,
      message: pesanError,
    } = await getWarehouse(paramSend);
    if (kodeError !== '000') {
      alert(pesanError);
      return;
    }

    setPilAlamat(true);
    const filtered = datax
      .sort((a, b) => a.jarak - b.jarak)
      .filter((listWarehouse) => listWarehouse.type === 'WAREHOUSE');
    console.log({ filtered });
    setCart({
      ...cart,
      infoPenerima: receiverName,
      listWarehouse: filtered,
      addressCode: addrCodeVal,
      addressType,
      postcodeLatitute,
      postcodeLongitude,
      infoPilAlamat: receiverName.toUpperCase(),
    });
  };

  return (
    <>
      <Grid item md={12} xs={12} sx={{ padding: 1 }}>
        <TextField
          fullWidth
          name="keySearchAddr"
          value={keySearchAddr}
          label="Filter Pencarian Alamat"
          onChange={cariAlamat}
          sx={{ marginBottom: 1 }}
        />
        <Button
          startIcon={<AddIcon />}
          size="small"
          color="primary"
          variant="contained"
          sx={buttonStyle}
        >
          Tambah Alamat Baru
        </Button>
      </Grid>
      <Grid item md={12} xs={12} sx={{ padding: 1 }}>
        {infoPilAlamat && (
          <Alert
            severity="success"
            sx={{ height: '39px', padding: 0.5, marginBottom: 1 }}
          >
            <AlertTitle>{infoPilAlamat}</AlertTitle>
          </Alert>
        )}
        <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
          <Card>
            {hasilPencarianAlamat?.map((dtax, index) => {
              const {
                addressCode: addrCodeInCart,
                receiverName,
                telp,
                alamat,
                provinsi,
                kabupaten,
                kecamatan,
                kelurahan,
              } = dtax;
              const nilaiMarginAlamat = alamat.length > 40 ? 2 : 0;
              const areax = `${provinsi} - ${kabupaten} - ${kecamatan} - ${kelurahan}`;
              const upperCaseArea = areax.toUpperCase();

              return (
                <>
                  <CardContent key={index}>
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
                        <Typography variant="subtitle2">{`${receiverName.toUpperCase()}`}</Typography>
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
                        <Typography variant="subtitle2">{`${telp}`}</Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      md={12}
                      direction="row"
                      sx={{ padding: 0, marginBottom: nilaiMarginAlamat }}
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
                          {alamat.toUpperCase()}
                        </Typography>
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
                          {upperCaseArea}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      md={12}
                      direction="row"
                      sx={{ padding: 0 }}
                    />
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" spacing={1}>
                      {addressCode === addrCodeInCart && (
                        <Alert
                          severity="success"
                          sx={{ height: '39px', padding: 0.5 }}
                        >
                          <AlertTitle>
                            Alamat sudah dipilih&nbsp;&nbsp;&nbsp;
                          </AlertTitle>
                        </Alert>
                      )}

                      {addressCode !== addrCodeInCart && (
                        <>
                          <Button
                            startIcon={<CheckIcon />}
                            size="small"
                            color="success"
                            variant="contained"
                            sx={buttonStyle}
                            onClick={() => handlePilihAlamat(dtax)}
                          >
                            Pilih Alamat
                          </Button>
                          <Button
                            startIcon={<DeleteIcon />}
                            size="small"
                            color="error"
                            variant="contained"
                            sx={buttonStyle}
                          >
                            Hapus
                          </Button>
                        </>
                      )}
                    </Stack>
                  </CardActions>
                </>
              );
            })}
          </Card>
        </Paper>
        <Divider />
      </Grid>
    </>
  );
}

export default PilihAlamat;
