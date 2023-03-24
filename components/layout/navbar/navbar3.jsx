import React, { useState } from 'react';
import Link from '@mui/material/Link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Drawer from '@mui/material/Drawer';
import PersonIcon from '@mui/icons-material/Person';
import { useAppContext } from '../../../context/app';
import UserSettingList from './userSettingList';

import PreviewCart from '../../cart/previewCart';

function Navbar3() {
  const { cart, login } = useAppContext();
  const { data: isiCart, priceCode } = cart;

  const [anchorPopCart, setAnchorPopCart] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(false);

  const handleOpenPopCart = (event) => {
    setAnchorPopCart(event.currentTarget);
  };

  const handleClosePopCart = () => {
    setAnchorPopCart(null);
  };
  const handleOpenNavMenu = () => {

  };

  const toggleDrawer = () => {
    setAnchorElUser(!anchorElUser);
  };

  const totalItem = isiCart.length;
  const open = Boolean(anchorPopCart);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'block' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 800,
              letterSpacing: '.01rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LoremAsum
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
          <Box sx={{ flexGrow: 0 }}>
            <Badge badgeContent={totalItem} color="error" sx={{ mr: 1 }}>
              <Typography
                aria-owns={open ? 'popCartOver' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleOpenPopCart}
                onMouseLeave={handleClosePopCart}
              >
                <Link href="/cart" color="inherit">
                  <ShoppingCartIcon />
                </Link>
              </Typography>

              <Popover
                id="popCartOver"
                sx={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorPopCart}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handleClosePopCart}
                disableRestoreFocus
              >
                <PreviewCart
                  isiCart={isiCart}
                  priceCode={priceCode}
                  login={login}
                />
              </Popover>
            </Badge>
            <Tooltip title="Open settings">
              <IconButton onClick={toggleDrawer} sx={{ p: 0 }} color="inherit">
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Drawer
              anchor="right"
              open={anchorElUser}
              onClose={toggleDrawer}
            >
              <UserSettingList
                tutup={toggleDrawer}
              />
            </Drawer>

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar3;
