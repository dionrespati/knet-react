import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';

/* import Card from '@mui/material';
import CardContent from '@mui/material'; */

import { useAppContext } from '../../../context/app';
/* import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import { Select, FormControl, InputLabel, } from '@mui/material'; */

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavbarMui = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorPopCart, setAnchorPopCart] = useState(null);

  const { lang, setLang } = useAppContext();
  const { login, setLogin} = useAppContext();
  const { cart, setCart} = useAppContext();
  const { data: isiCart } = cart;

  //console.log({isiCart});

  const handleOpenPopCart = (event) => {
    setAnchorPopCart(event.currentTarget)
  }

  const handleClosePopCart = () => {
    setAnchorPopCart(null)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const changeLang = (e) => {
    setLang(e.target.value);
  }

  const totalItem = isiCart.length;
  //console.log({totalItem});
  const open = Boolean(anchorPopCart);

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <FormControl variant="standard">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lang}
                label="Language"
                onChange={changeLang}
                displayEmpty
              >
                <MenuItem value="in">IND</MenuItem>
                <MenuItem value="en">ENG</MenuItem>
                
              </Select>
          </FormControl>  */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BukanTipuTipu
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          
          <Badge badgeContent={totalItem} color="error">
            <Typography
              aria-owns={open ? 'popCartOver' : undefined}
              aria-haspopup="true"
              onMouseEnter={handleOpenPopCart}
              onMouseLeave={handleClosePopCart}
            >
              <ShoppingCartIcon></ShoppingCartIcon>
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
              <List
                sx={{
                  width: '100%',
                  maxWidth: 450,
                  bgcolor: 'background.paper',
                }}
              >
                {isiCart && isiCart.map((item) => {
                  const {productId, productName, qty, img} = item;
                  const isiJumlah = `Jumlah : ${qty}`;
                  return (
                    <>
                      <ListItem key={productId}>
                        <ListItemAvatar>
                          <Avatar>
                            
                            
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={productName} secondary={isiJumlah} />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  );      
                })}
              </List>
            </Popover>
          </Badge>  
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClick={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarMui;
