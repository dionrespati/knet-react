import React, { useEffect } from 'react';
import cn from 'classnames';
import {
  oneOfType, oneOf, string, bool, func,
} from 'prop-types';
import MinMaxInputMessage from './message';
import EmailMessage from './emailMessage';


const TextInput = (props) => {

  const {
    label,
    message,
    name,
    type,
    value,
    isError,
    onChange,
    onBlur,
    required,
    readOnly,
    className,
    pattern,
    setLength,
  } = props;

  return (
    
    <div className={cn('text-sm mb-2', { error: isError })}>
      <label
        htmlFor={name}
        className="block mb-1 font-semibold"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        readOnly={readOnly}
        placeholder={required ? "Wajib diisi " : ""}
        className={cn(
          'p-1 border border-gray-400 rounded w-96',
          className,
          {
            'border-darkgrey': !readOnly,
            'bg-gray-200 border-gray-500 cursor-not-allowed focus:outline-none': readOnly,
          },
        )}
      />
      {!isError && (
        <span className='inline-block ml-1'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </span>
      )}
      
      {/* {message && <p className='text-sm font-normal text-red-600'>* {message}</p>} */}
      
      {setLength && (
        <MinMaxInputMessage 
         setLength={setLength}
         value={value}
        />
      )}

      {type === 'email' && (
        <EmailMessage value={value} />
      )}
      
      <p className='text-sm font-normal text-red-600'>* Harus mengandung Huruf Besar, huruf kecil, karakter khusus</p>
    </div>
  );

};

TextInput.defaultProps = {
  type: 'text',
  required: false,
  message: undefined,
  name: undefined,
  value: undefined,
  label: undefined,
  isError: true,
  readOnly: false,
  className: undefined,
  setLength: undefined,
  onChange: () => {},
  onBlur: () => {},
};

TextInput.propTypes = {
  type: oneOfType([
    oneOf(['text', 'date', 'password', 'email', 'number', 'url']),
  ]),
  message: string,
  name: string,
  value: string,
  label: string,
  isError: bool,
  onChange: func,
  onBlur: func,
  required: bool,
  readOnly: bool,
  className: string,
  setLength: string,
};

export default TextInput;
