import React from 'react';
import cn from 'classnames';
import {
  oneOfType,
  oneOf,
  string,
  bool,
} from 'prop-types';

const Button = (props) => {
  const {
    text,
    type,
    color,
    size,
    block,
    disabled,
    ...other
  } = props;

  return (
    <button
      {...other}
      className={cn(
        'px-2 py-0',
        'text-md rounded',
        {
          'bg-blue-600 hover:bg-gray-700 hover:text-red-300': color === 'primary' && !disabled,
          'bg-white': color === 'flat' && !disabled,
          'bg-red-700 hover:bg-gray-700': color === 'danger' && !disabled,
          'bg-green-700 hover:bg-gray-700': color === 'success' && !disabled,
          'text-white': ['primary', 'danger', 'success'].includes(color),
          'text-black': color === 'flat',
          'bg-gray-400': disabled === true,
        },
        {
          'h-12': size === 'large',
          'h-10': size === 'medium',
          'h-7': size === 'tiny'
        }
      )}
      type={type}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  color: 'primary',
  size: 'tiny',
  block: null,
  text: null,
};

Button.propTypes = {
  type: oneOfType([
    oneOf(['button', 'submit']),
  ]),
  color: oneOfType([
    oneOf(['primary', 'flat', 'danger', 'success']),
  ]),
  size: oneOfType([
    oneOf(['tiny', 'small', 'medium', 'large']),
  ]),
  text: string,
  block: bool,
};

export default Button;
