import React, {useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';

const PasswordMui = (props) => {
  const {
    value, handleOnChange, label, name, passwordVisible, setPasswordVisible, setValidPassword, ...inputProp 
  } = props;

  const isMinChar = value.length >= 10;
  const isMaxChar = value.length <= 15 && value.length > 0;
  const hasLowerCase = /[a-z]/.test(value);
  const hasUpperCase = /[A-Z]/.test(value);
  const hasSpecialChar = /[!@#\$%\^&\*+]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const isValidPassword = isMinChar && isMaxChar && hasLowerCase && hasUpperCase && hasSpecialChar && hasNumber;

  useEffect(() => {
    setValidPassword(isValidPassword);
  },[isValidPassword]);

  return (
    
    <TextField
      error={!isValidPassword && value.length > 0}
      name={name}
      label={label}
      value={value}
      type={passwordVisible ? "text" : "password"}
      onChange={handleOnChange}
      autoComplete="password"
      autoFocus
      InputProps={{
        startAdornment: <KeyIcon position="start"></KeyIcon>,
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
        ) 
      }}
      helperText={isValidPassword ? "" : "* Minimal 10 - 15 karakter. Harus mengandung huruf besar, huruf kecil angka dan karakter khusus"}
      {...inputProp}
    />
    
  )
}

export default PasswordMui;