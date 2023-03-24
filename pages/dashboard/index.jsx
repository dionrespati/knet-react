import React, { useState } from 'react';
import Textfield from '../../components/form/Textfield';

const index = () => {
  const [dataLogin, setDataLogin] = useState({
    username: '',
    password: '',
  });

  const { username, password } = dataLogin;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };

  return (
    <div>
      <h3>Login User</h3>
      <Textfield
        label="Username"
        name="username"
        type="text"
        value={username}
        onChange={handleOnChange}
        message="Username harus diisi"
      />
      <Textfield
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default index;
