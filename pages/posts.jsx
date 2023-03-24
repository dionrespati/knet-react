import React, { useState, useEffect } from 'react';
import { useAppContext } from "../context/app";
import cn from 'classnames';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const posts = () => {
  const {login} = useAppContext();
  const [isValid, setValid] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleOnChange = (e) => {
    const newValue = {
      ...formData, 
      [e.target.name]: e.target.value
    }
    setFormData(newValue);
  }
  /* const [post, setPost] = useState({}); */

  useEffect(() => {    
    /* const hasil = null;
    fetch('http://localhost:3000/api/member/list')
     .then(response => response.json())
     .then(data => {
      console.log('useEffect dipanggil api');
       if(data !== null) {
         setValid(1);
       }
       setPost(data)
     }); */
     console.log({formData});
    
  },[formData]);

  const {username, password} = formData;

  return (
    <>
      <Box
        className={cn('mt-2 w-1/3 bg-gray-100 m-1')}
      >
        <TextField
          id="username"
          name="username"
          variant="outlined"
          label="Username"
          value={username}
          onChange={handleOnChange}
          size="small" 
          margin="dense"
          required
          fullWidth
        />

        <TextField
          id="password"
          name="password"
          variant="outlined"
          label="Password"
          value={password}
          onChange={handleOnChange}
          size="small"
          margin="dense"
          required
          fullWidth
        />

        <Button variant="contained" className="m-2 block">Primary</Button>
      </Box>
    </>
  );
};

export default posts;

