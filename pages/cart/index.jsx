import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import ListCart from '../../components/cart/listCartListItem';
import DeliveryOption from '../../components/cart/deliveryOption';
import PaymentOption from '../../components/cart/paymentOption';

const steps = ['Keranjang Belanja', 'Pilih Metode Pengiriman', 'Pilih Pembayaran'];

const index = () => {
  const [step, setStep] = useState(0);

  console.log('Halaman Cart index page invoked..');

  return (
    <Box
      mt={12}
      sx={{
        p: 0.5,
        width: '100%',
        backgroundColor: 'grey',
      }}
    >
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography variant="h6">{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container direction="row" columns={12} spacing={1} sx={{ marginTop: 4 }} justifyContent="space-evenly">
        {step === 0 && (
        <ListCart
          setStep={setStep}
        />
        )}

        {step === 1 && (
        <DeliveryOption
          step={step}
          setStep={setStep}
        />
        )}

        {step === 2 && (
        <PaymentOption />
        )}
      </Grid>
    </Box>
  );
};

export default index;
