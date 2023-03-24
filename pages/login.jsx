import React, { useEffect, useState, useContext } from 'react';
import cn from 'classnames';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import EmailMui from '../components/form/Textfield/emailMui';
import PasswordMui from '../components/form/Textfield/passwordMui';

import { useAppContext } from '../context/app';

/* import { IconButton, LockIcon, Visibility, VisibilityOff } from '@mui/icons-material'; */
/* import { Input } from 'postcss'; */


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const formLoginEn = {
  header: "Welcome, Please Login..",
  emailLable: "Email Address",
  passwordLable: "Password",
  forgotPwd: "Forgot Password?",
  signHere: "Don't have an account? Sign Up",
  infoMsgEmail: "Email format must valid"
}

const formLoginIn = {
  header: "Selamat Datang, silahkan Login",
  emailLable: "Alamat Email",
  passwordLable: "Katakunci",
  forgotPwd: "Lupa Password?",
  signHere: "Registrasi disini",
  infoMsgEmail: "Format Email harus benar"
}

const Login = () => {
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);

  const { lang } = useAppContext();
  
  const [validResponse, setValidResponse] = useState({
    err: null,
    message: '' 
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const {email, password} = formData;
  const { err, message } = validResponse;

  const handleOnChange = (e) => {
    const newValue = {
      ...formData,
      [e.target.name]: e.target.value
    }
    setFormData(newValue);
  }

  const inputProp = {
    variant: "outlined",
    fullWidth: true,
    margin: "normal",
    required: true,
    size: "small",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('https://www.k-net.co.id/logtest', {
      email: email,
      password: password
    })
    .then(function(datax) {
      const { response, message} = datax.data;
      console.log({datax});
      if(response === "true") {
        setValidResponse({
          err: false,
          message: message,
        });
      } else {
        setValidResponse({
          err: true,
          message: message,
        });
      }
      console.log({validResponse});
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  useEffect(() => {
    console.log("re render");
    console.log({validResponse, errMsg})
  });

  let errMsg;
  if(err === null || err === undefined) {
    errMsg = "";
  } else if(err) {
   errMsg = <Alert variant="filled" size="small" severity="error">{message}</Alert>
  } else {
   errMsg = <Alert variant="filled" size="small" severity="success">{message}</Alert>
  } 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {lang === "in" ? formLoginIn.header :  formLoginEn.header}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            <EmailMui 
              value={email}
              label={lang === "in" ? formLoginIn.emailLable :  formLoginEn.emailLable}
              name="email"
              onChange={handleOnChange}
              setValidEmail={setValidEmail}
              {...inputProp}
            />
            
            <PasswordMui 
              value={password}
              label={lang === "in" ? formLoginIn.passwordLable :  formLoginEn.passwordLable}
              name="password"
              onChange={handleOnChange}
              passwordVisible={passwordVisible}
              setPasswordVisible={setPasswordVisible}
              setValidPassword={setValidPassword}
              {...inputProp}
            />
            
            <Grid container>
              <Grid item xs className={cn('mr-1')}>
                <Link href="#" variant="body2">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!isValidEmail || !isValidPassword}
                  >
                    Login
                  </Button>
                </Link>
                {errMsg}
              </Grid>
              
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                {lang === "in" ? formLoginIn.forgotPwd :  formLoginEn.forgotPwd}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                {lang === "in" ? formLoginIn.signHere :  formLoginEn.signHere}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
