import React, { useState } from 'react';

import {
  func, bool,
} from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';

import PersonIcon from '@mui/icons-material/Person';

import { loginAuth } from '../../../pages/api/member/login';
import { useAppContext } from '../../../context/app';

function InlineLogin({ statusOpen, setShowLogin }) {
  const {
    login, setLogin, cart, setCart,
  } = useAppContext();

  const [dataLogin, setDataLogin] = useState({ memberId: '', password: '' });
  const [validLogin, setValidLogin] = useState(0);
  const [errMessage, setErrMessage] = useState('');

  const { memberId, password } = dataLogin;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => setShowLogin(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === 'memberId') {
      value = value.toUpperCase();
    }
    const NewArr = {
      ...dataLogin, [name]: value,
    };
    setDataLogin(NewArr);
  };

  const handleLogin = async () => {
    const { errCode, data, message } = await loginAuth(memberId, password);
    if (errCode === '000') {
      setValidLogin(1);
      const newArr = {
        ...login,
        userlogin: data[0].dfno,
        loginname: data[0].fullnm,
      };
      setLogin(newArr);
      setCart({ ...cart, memberId: data[0].dfno, memberName: data[0].fullnm });
      setShowLogin(false);
      return;
    }

    if (errCode === '001') {
      setValidLogin(2);
      setErrMessage(message);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={statusOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Login User
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                label="ID Member"
                name="memberId"
                value={memberId}
                sx={{ marginBottom: 2 }}
                InputProps={{
                  startAdornment: <PersonIcon position="start" />,
                }}
                onChange={handleOnChange}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={password}
                type={passwordVisible ? 'text' : 'password'}
                InputProps={{
                  startAdornment: <KeyIcon position="start" />,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          edge="end"
                        >
                          {passwordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleOnChange}
                sx={{ marginBottom: 2 }}
              />
              {validLogin === 2 && (
              <Alert variant="filled" severity="error">
                {errMessage}
              </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                type="button"
                fullWidth
                color="success"
                variant="contained"
                onClick={handleClose}
              >
                Close
              </Button>
            </Box>
          </Container>
        </DialogContentText>
      </DialogContent>
      {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions> */}
    </Dialog>
  );
}

InlineLogin.defaultProps = {
  statusOpen: false,
};

InlineLogin.propTypes = {
  statusOpen: bool.isRequired,
  setShowLogin: func.isRequired,
};

export default InlineLogin;
