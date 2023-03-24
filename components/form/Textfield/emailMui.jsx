import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import {
  string, 
} from 'prop-types';

const EmailMui = ({ value, handleOnChange, label, name, setValidEmail, ...inputProp }) => {

  const isValidEmail = value && value.length > 0 && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase());

  useEffect(() => {
    setValidEmail(isValidEmail);
  },[isValidEmail]);

  return (

    <TextField
      error={!isValidEmail && value.length > 0}
      label={label}
      value={value}
      name={name}
      autoComplete="email"
      autoFocus
      onChange={handleOnChange}
      helperText={isValidEmail && value.length > 0 ? "" : "* Format email harus benar"}
      InputProps={{
        startAdornment: <EmailIcon position="start"></EmailIcon>,
      }}
      {...inputProp}
    />
  )
}

export default EmailMui;