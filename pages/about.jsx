/* eslint-disable react/function-component-definition */
import React from 'react';
import Axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useAppContext } from '../context/app';
import ProductList from '../components/product/productList';

const queryQlient = new QueryClient();

const getListProduct = async () => {
  await Axios({ url: 'https://www.k-net.co.id/tes_api_prd' })
    .then((res) => {
      const { data } = res;
      console.log({ data });
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error('Error when fetching..');
    });
};

const Todos = () => {
  // Access the client
  const queryClient = useQueryClient();
  // Queries

  const { login } = useAppContext();

  console.log('Halaman product index invoked..');
  const { data, isLoading, isFetching, isError, isSuccess } = useQuery(
    'product',
    getListProduct
  );

  console.log({ data });

  if (isLoading) {
    return <div>Is loading..enteni sedelok</div>;
  }

  if (isFetching) {
    return <div>Lagi njupuk data..SING SABAR..!!!</div>;
  }

  if (isError) {
    return <div>Damput...error mas bro</div>;
  }

  if (isSuccess) {
    const { arrayData: dataPrd } = data;
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
              {dataPrd &&
                dataPrd.map((item) => {
                  const { prdcd } = item;
                  return <ProductList key={prdcd} item={item} login={login} />;
                })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
};

const About = () => (
  <QueryClientProvider client={queryQlient}>
    <Todos />
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default About;
