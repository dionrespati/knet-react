/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Axios from 'axios';
import { baseUrlApi } from '../../custom/contoh';
import getDistrictLatLong from '../../pages/api/servis-kirim/getDistrictLatLong';
import getDistrictStk from '../../pages/api/servis-kirim/getDistrictStk';
import { useAppContext } from '../../context/app';

export default function ListArea() {
  const { cart, setCart } = useAppContext();
  const { areaStockist, chooseStk, listStockist } = cart;
  const [listArea, setListArea] = useState([]);

  console.log({ listStockist });

  const setArea = async (nilai) => {
    if (nilai === null || nilai === '' || nilai === undefined) {
      return;
    }

    const { errCode, data, message } = await getDistrictLatLong(nilai);
    if (errCode !== '000') {
      alert(message);
      return;
    }

    const {
      errCode: kodeError,
      data: datax,
      message: pesanError,
    } = await getDistrictStk(data);
    console.log({ kodeError, datax, pesanError });
    if (kodeError !== '000') {
      alert(pesanError);
      return;
    }

    const isiStokis = [];
    for (let i = 0; i <= 9; i++) {
      const stockistReffCode = datax[i].officeCode;
      const stockistName = datax[i].warehouse;
      const priceCodeStk = datax[i].priceCode;
      // const inputan = stockistReffCode +"|"+ stockistName + "|" + priceCodeStk;
      const idValue = `${stockistReffCode}|${priceCodeStk}`;
      const textValue = `${stockistReffCode} - ${stockistName}`;
      const newArrListStk = {
        label: textValue,
        id: idValue,
      };

      isiStokis.push(newArrListStk);
    }

    /* setListStockist(isiStokis); */
    const { label, id } = isiStokis[0];
    const stkcode = id.split('|');
    setCart({
      ...cart,
      areaStockist: nilai,
      listStockist: isiStokis,
      stockistCode: stkcode[0],
      stockistName: label,
      chooseStk: id,
    });
  };

  const searchArea = (e) => {
    const { value } = e.target;
    // console.log({name, value});
    if (value.length >= 4) {
      // console.log(`${baseUrlApi}/getdistrict?query=${value}`);
      Axios.get(`${baseUrlApi}/getdistrict?query=${value}`).then((res) => {
        const { status, data } = res;
        if (status === 200) {
          const { suggestions } = data;
          const arrArea = [];
          suggestions.forEach((resx) => {
            const { value: resValue } = resx;
            arrArea.push(resValue);
          });
          setListArea(arrArea);
        }
      });
    }
  };

  const setStockist = (nilai) => {
    if (nilai === null || nilai === '' || nilai === undefined) {
      return;
    }

    const { id, label } = nilai;
    const arrStk = id.split('|');

    const newareaStockist = {
      ...cart,
      stockistCode: arrStk[0],
      priceCode: arrStk[1],
      chooseStk: id,
      stockistName: label,
    };
    setCart(newareaStockist);
  };

  const selectedStk = listStockist.filter((x) => x.id === chooseStk);
  console.log({ selectedStk });

  return (
    <Box sx={{ p: 1 }}>
      <Grid item container xs={12} md={12} direction="row" sx={{ padding: 1 }}>
        <Grid item md={12} xs={12} sx={{ padding: 1 }}>
          <Autocomplete
            name="stkarea"
            options={listArea}
            defaultValue={areaStockist}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tulis Nama Kota/Kecamatan"
                onChange={(e) => searchArea(e)}
              />
            )}
            onChange={(event, value) => setArea(value)}
            fullWidth
          />
        </Grid>
        <Grid item md={12} xs={12} sx={{ padding: 1 }}>
          <Autocomplete
            name="stockist"
            options={listStockist}
            getOptionLabel={(option) => option.label}
            defaultValue={selectedStk[0]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pilihan Stockist"
                /* onChange={(e) => searchArea(e)} */
              />
            )}
            loading
            onChange={(event, value) => setStockist(value)}
            autoHighlight
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}
