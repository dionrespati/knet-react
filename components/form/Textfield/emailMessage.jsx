import React from 'react';
import {
  string,
} from 'prop-types';

const EmailMessage = ({ value }) => {
  
  const isValidEmail = value && value.length > 0 && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase());

  return (
    <p className={isValidEmail ? 'hidden' : 'text-sm font-normal text-red-600'}>Format Email harus mengandung "@" dan ""."</p>
  );
};

EmailMessage.defaultProps = {
  value: ''
};

EmailMessage.propTypes = {
  value: string,
};

export default EmailMessage;