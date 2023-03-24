import React, { useState, useEffect } from 'react';

import TextField from '../components/form/Textfield';
import Button from '../components/form/Button';

/* import { useAppContext } from "../context/app";
import useCoockies from '../custom/useCookies';
import useInput from '../custom/useInput'; */




const home = () => {
  //const [name, setName] = useCoockies('name', '');
  
  /* const initData = {
    name: 'Dion Respatidsd asdad',
    birthdt: '2000-01-01',
  };

  const [data, setData] = useCoockies('form2', JSON.stringify(initData));

  const handleChange = (event) => {
    

    const { value, name } = event.target;
    let obj = JSON.parse(data);
    const newValue = {
      ...obj,
      [name]: value,
    };
    setData(newValue);
    console.log({newValue});

    
  }; */

  const initialValue = { email: "",  password: ""};
  const [formLogin, setFormLogin] = useState(initialValue);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleOnChange = (e) => {
    const { name,  value} = e.target;
    const newValue = {
      ...formLogin,
      [name]: value,
    };
    setFormLogin(newValue);
  }

  const {email, password} = formLogin;

  const isMinChar = password.length >= 10;
  const isMaxChar = password.length <= 15 && password.length > 0;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#\$%\^&\*+]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isValidPassword = isMinChar
    && isMaxChar && hasLowerCase && hasUpperCase && hasSpecialChar && hasNumber;
    //const isValidConfirmPwd = password === confirmPassword;
  const isValidEmail = email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());

  return ( 
    <> 
      <div className=''></div> 
      <TextField 
        label="Email"
        name="email"
        value={email}
        onChange={handleOnChange}
        isError={!isValidEmail}
      /> 
      
      <TextField 
        label="Password"
        name="password"
        value={password}
        onChange={handleOnChange}
        isError={!isValidPassword}
        type={isPasswordVisible ? "text" : "password"}
      /> 
      
      <Button 
        type="button" 
        text="Simpan" 
        color="primary" 
        size="tiny" 
        disabled={!isValidPassword || !isValidEmail}
      />
      &nbsp;
      <Button 
        type="button" 
        text="View Password" 
        color="flat" 
        size="tiny" 
        onClick={() => setPasswordVisible(!isPasswordVisible)}
      />
    </>
  );        
};

export default home;
