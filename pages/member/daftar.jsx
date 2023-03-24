import React, { useState } from 'react';
import Button from '../../components/form/Button';
import TextInput from '../../components/form/Textfield';

const initValue = {
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const daftar = () => {
  const [formData, setFormData] = useState(initValue);

  const handleForm = (event) => {
    const { value, name } = event.target;
    const newValue = {
      ...formData,
      [name]: value,
    };
    setFormData(newValue);
  };

  const {
    firstname, lastname, username, password, confirmPassword,
  } = formData;

  return (
    <div className="bg-white dark:bg-gray-800">
      <TextInput
        label="First Name"
        type="text"
        name="firstname"
        value={firstname}
        onChange={handleForm}
      />
      <TextInput
        label="Last Name"
        type="text"
        name="lastname"
        value={lastname}
        onChange={handleForm}
      />
      <TextInput
        label="User Name"
        type="text"
        name="username"
        value={username}
        onChange={handleForm}
      />
      <TextInput
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={handleForm}
      />

      <TextInput
        label="Konfirmasi Password"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleForm}
      />
      <Button
        type="submit"
        text="Register"
      />
    </div>
  );
};

export default daftar;
