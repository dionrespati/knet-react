import React, { useState } from 'react';
import TextField from '../components/form/Textfield';

/* const inputs = [
  {
    label: "Username",
    name: "username",
    //errorMessage: "Karakter terdiri dari 3 - 16 dan tidak boleh mengandung karakter spesial",
    required: true,
    minLength: 8,
    maxLength: 12
  },
  {
    label: "Password",
    name: "password",
    //errorMessage: "Password minimal terdiri dari 8 - 16 karakter, harus mengandung minimal 1 Huruf Kapital, Huruf Kecil dan Angka",
    required: true,
    pattern:""
  },
   {
    label: "Nama Lengkap",
    name: "namaLengkap",
    errorMessage: "Hanya Huruf, maksimal 30 karakter",
    required: true,
    pattern: "[A-Za-z]{30}"
  },
  {
    label: "No KTP",
    type: "number",
    name: "noKtp",
    errorMessage: "Hanya angka, terdiri dari 12-14 digit",
    required: true,
    pattern: {}
  } 
]; */

/* const isMinChar = password.length >= 8;
const isMaxChar = password.length <= 24 && password.length > 0;
const hasLowerCase = /[a-z]/.test(password);
const hasUpperCase = /[A-Z]/.test(password);
const hasSpecialChar = /[!@#\$%\^&\*+]/.test(password);
const hasNumber = /[0-9]/.test(password);
const isValidPassword = isMinChar
  && isMaxChar && hasLowerCase && hasUpperCase && hasSpecialChar && hasNumber;
const isValidConfirmPwd = password === confirmPassword;
const isValidEmail = email && availableEmail && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase()); */

const todo = () => {

  const initialValue = { username: "", email:"",  password: "", noKtp: "", namaLengkap: ""};
  const [formData, setFormData] = useState(initialValue);

  const handleForm = (e) => {
    const { value, name } = e.target;
    const newValue = {
      ...formData,
      [name]: value,
    };
    setFormData(newValue);
    //console.log({formData});
  }

  const { username, email } = formData;

  return (
    <>
      {/* {inputs && inputs.map((dataInput) => {
        const {label, name, pattern, errorMessage, required, } = dataInput;
        return ( */}
          <TextField 
            label="Username"
            name="username"
            pattern="[a-zA-Z]"
            message=""
            required={true}
            onChange={handleForm}
            value={username}
            setLength="10-15"
          />

          <TextField 
            label="Email"
            name="email"
            type="email"
            required={true}
            onChange={handleForm}
            value={email}
          />
        {/* );
      })} */}
      
    </>
  );
}


export default todo;