/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppWrapper } from '../context/app';
import Navbar from '../components/layout/navbar/navbar3';
import './index.css';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : Fragment;
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppWrapper>
        <Layout>
          <Navbar />
          <Component {...pageProps} />
        </Layout>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default MyApp;
