import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaceIcon from '@mui/icons-material/Place';
import { Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import icon from "../images/ubikateLogo.svg";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import ChecklistIcon from '@mui/icons-material/Checklist';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openConfigs, setOpenConfigs] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenConfigs(false);
  };

  const handleConfigMenu = () => {
    setOpenConfigs(!openConfigs);
    if (openConfigs) {
      setOpen(false)
    } else {
      setOpen(true)
    }

  }

  const menuOptions = [
    { name: 'Asistencia', icon: <ChecklistIcon color='secondary' /> },
    { name: 'Colaborador', icon: <GroupOutlinedIcon color='secondary' /> },
    { name: 'Mapa', icon: <PlaceIcon color='secondary' /> }
  ]

  const listItemButtonStyle = {
    minHeight: 40,
    justifyContent: open ? 'initial' : 'center',
    p: '15px',
  }

  const listItemIconStyle = {
    minWidth: 0,
    mr: open ? 1 : 'auto',
    justifyContent: 'center',
    backgroundColor: "background.default",
    borderRadius: "50%",
    padding: "0.5em"
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="img" sx={{
            width: 100
          }}
            src={icon}
          >
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton color="secondary" onClick={handleDrawerClose} sx={{ ...(openConfigs && { display: 'none' }) }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ height: "100%" }}>
          {
            !openConfigs ? <><List>
              {menuOptions.map((menu, index) => (

                <ListItem key={menu.name} disablePadding sx={{ display: 'block' }}>
                  <Link to={`/${menu.name.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton
                      sx={listItemButtonStyle}
                    >
                      <ListItemIcon
                        sx={listItemIconStyle}
                      >
                        {menu.icon}
                      </ListItemIcon>
                      <ListItemText primary={menu.name} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
              <List>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={handleConfigMenu}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton sx={listItemButtonStyle}>
                      <ListItemIcon sx={listItemIconStyle}>
                        <SettingsOutlinedIcon color='secondary' />
                      </ListItemIcon>
                      <ListItemText primary="Configuración" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton sx={listItemButtonStyle}>
                      <ListItemIcon sx={listItemIconStyle}>
                        <LogoutOutlinedIcon color='secondary' />
                      </ListItemIcon>
                      <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List> </> :
              <Box>
                <Box display="flex" alignItems="center" gap={2} pl={1} my={2}>
                  <IconButton onClick={handleConfigMenu}>
                    <ArrowBackOutlinedIcon color='secondary' />
                  </IconButton>
                  <Typography variant='h6' fontWeight="bold" fontSize={16}>
                    Configuración
                  </Typography>
                </Box>
                <Divider variant='middle' />
                <List>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <Link to={"/configuracion/grupos"} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItemButton sx={{ backgroundColor: 'background.default', mx: 2, borderRadius: '8px' }}>
                        <ListItemIcon>
                          <Diversity3OutlinedIcon color='secondary' />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              sx={{ opacity: open ? 1 : 0, fontWeight: 'bold' }}
                            >
                              Grupos
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </List>
              </Box>
          }

        </Box>


      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100%' }}>
        <DrawerHeader />
        <Grid item xs={12}>
          {children}
        </Grid>
      </Box>
    </Box>
  );
}