import React from 'react';

const MinMaxInputMessage = (props) => {
  const { value, setLength } = props;
  
  let minLength = 0;
  let maxLength = 0;
  if(setLength !== undefined) {
    const arrLength = setLength.split("-");
    minLength = arrLength[0];
    maxLength = arrLength[1];
  }

  const checkMinLength = value.length >= minLength ? true : false;
  const checkMaxLength = value.length <= maxLength ? true : false;
  const checkMinMaxLength = checkMinLength && checkMaxLength;

  return (
    <p className={checkMinMaxLength ? 'hidden' : 'text-sm font-normal text-red-600'}>* Minimal Karakter adalah {minLength} - {maxLength}</p>
  );
}

export default MinMaxInputMessage;