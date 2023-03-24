/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';

import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ProductList from '../../components/product/productList';
import { useAppContext } from '../../context/app';
/* import ProductSidebar from '../../components/product/productSidebar';
import SearchBar from '../../components/product/searchBar'; */

const index = () => {
  const { login } = useAppContext();
  const [dataPrd, setDataPrd] = useState([]);

  console.log('Halaman product index invoked..');

  useEffect(() => {
    axios.get('https://www.k-net.co.id/tes_api_prd')
      .then((res) => {
        const { response, arrayData } = res.data;
        console.log({ response, arrayData });
        if (response === 'true') {
          /* const newArrData = {
            prdcd,
            prdnm,
            prdcdcat,
            priceWestDist: price_w,
            priceEastDist: price_e,
            priceWestCust: price_cw,
            priceEastCust: price_ce,
            bv,
            weight,
            imageUrl: img_url
          }; */
          const newArr = [];
          arrayData.forEach((dataprodukItem) => {
            const {
              prdcd, prdnm, prdcdcat, price_w: priceWestDist, price_e: priceEastDist,
              price_cw: priceWestCust, price_ce: priceEastCust, bv, weight, img_url: imageUrl,
            } = dataprodukItem;

            const newArrObj = {
              prdcd,
              prdnm,
              prdcdcat,
              priceWestDist,
              priceEastDist,
              priceWestCust,
              priceEastCust,
              bv,
              weight,
              imageUrl,
            };
            newArr.push(newArrObj);
          });

          setDataPrd(newArr);
        }
      });
  }, []);

  return (
    <Box
      mt={10}
      sx={{
        p: 1,
      }}
    >
      <Grid container direction="row" columns={12}>
        <Grid item md={12} xs={12} sx={{ p: 1 }}>
          <Grid container spacing={1}>
            {dataPrd && dataPrd.map((item) => {
              const { prdcd } = item;
              return (
                <ProductList
                  key={prdcd}
                  item={item}
                  login={login}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>

  );
};

export default index;
