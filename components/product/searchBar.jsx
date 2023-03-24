import React from 'react';
/* import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box'; */
import { TextField } from '@mui/material';

const SearchBar = () => {
  return (
    <div>
      <TextField 
        name="pencarian"
        size='small'
      />
    </div>
  )
}

export default SearchBar;