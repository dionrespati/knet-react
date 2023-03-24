import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';

import { useAppContext } from '../../../context/app';
import InlineLogin from '../../form/Login/inlineLogin';

const UserSettingList = ({tutup}) => {
  const { login, setLogin } = useAppContext();
  const [showLogin, setShowLogin] = useState(false);

  const logout = ({onClose}) => {
    localStorage.removeItem('login');
    localStorage.removeItem('cart_content');
    setLogin(null);
  }
  return (
    <>
      <Paper sx={{ width: 450, maxWidth: '100%' }}>
        <MenuList>
        {login !== null && ( 
          <>
            <MenuItem divider>
              Welcome, {login.loginname} 
            </MenuItem>
            {/* <MenuItem>
              <ListItemIcon>
                <SettingsIcon></SettingsIcon>
              </ListItemIcon>
              <ListItemText>User Settings</ListItemText>
            </MenuItem> */}
            <MenuItem>
              <ListItemIcon>
                <EmailIcon></EmailIcon>
              </ListItemIcon>
              <ListItemText>Pesan</ListItemText>
            </MenuItem>
            {/* <Link></Link> */}
            <MenuItem>
              <ListItemIcon>
                <KeyIcon></KeyIcon>
              </ListItemIcon>
              <ListItemText>Ubah Password</ListItemText>
            </MenuItem>
            <MenuItem divider>
              <ListItemIcon>
                <ReceiptIcon></ReceiptIcon>
              </ListItemIcon>
              <ListItemText>Histori Transaksi</ListItemText>
            </MenuItem>
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
                </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
            <MenuItem onClick={tutup}>
              <ListItemIcon>
                <CloseIcon />
              </ListItemIcon>
              <ListItemText>Tutup Menu</ListItemText>
            </MenuItem>  
          </>
        )}

        {login === null && (
          <MenuItem onClick={() => setShowLogin(true)}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </MenuItem>
        )}  
          
        </MenuList>
      </Paper>
      <InlineLogin statusOpen={showLogin} setShowLogin={setShowLogin} />
    </>
  )
}

export default UserSettingList;