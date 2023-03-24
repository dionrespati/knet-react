import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const getSavedValue = (key, initialValue) => {
  const savedValue = Cookies.get(key);
  if(savedValue) return savedValue;
  if(initialValue instanceof Function) return initialValue();
  return initialValue;
}


const useCookies = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    Cookies.set(key, value);
  },[value]);

  return [value, setValue];
}

export default useCookies;