import React, { useState } from 'react';

import { RiUserFill, RiLockPasswordFill } from 'react-icons/ri';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import icon from "../images/ubikateLogo.svg";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import '../Styles/Login.scss';
import { Box, Button, IconButton, InputAdornment, Link, OutlinedInput, Typography } from '@mui/material';

import { userlogin } from '../Actions/Colaborador/Colaborador-api';
import moment from 'moment/moment';

const Login = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Lógica de inicio de sesión...
    const data = {
      usuario: user,
      contrasena: password
    };

    try {
      await userlogin(data);
      onLogin(); // Llamamos a la función onLogin si el inicio de sesión es exitoso
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'user') {
      setUser(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form">
      <div className="login-box">
        <Box component="img" sx={{
          height: 150,
          width: 200
        }}
          src={icon}
        >
        </Box>
        <h2 className="login-title">Iniciar sesión</h2>
        <form>
          <div className="form-group">
            <OutlinedInput
              sx={{ borderRadius: '30px', backgroundColor: 'background.paper', width:"90%" }}
              placeholder="Usuario"
              onChange={onChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircleIcon color='secondary' />
                </InputAdornment>
              }
            />
          </div>
          <div className="form-group">
            <OutlinedInput
              sx={{ borderRadius: '30px', backgroundColor: 'background.paper', '-ms-reveal': { color: 'white' }, width:"90%" }}
              placeholder="Contraseña"
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
              startAdornment={
                <InputAdornment position="start">
                  <HttpsIcon color='secondary' />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {
                      showPassword ? <VisibilityOffOutlinedIcon sx={{ color: 'text.primary' }}/> : <VisibilityOutlinedIcon sx={{ color: 'text.primary' }} />
                    }
                      
                  </IconButton>
                  
                </InputAdornment>
              }
            />
          </div>
          <Link href='recuperar-contrasena' underline="none" sx={{ color: 'loginLabelColor.main' }} className='forgot-password-link'>
            ¿Olvidaste tu contraseña?
          </Link>
          <Box display='flex' justifyContent='center' my={5}>
            <Button onClick={handleLogin} color='secondary' variant="contained" sx={{ borderRadius: '30px' }}>
              <Typography variant="button" sx={{ textTransform: 'none', color: "secondaryTextColor.main", fontWeight: '700', fontSize: '1.2em' }}>
                Iniciar sesión
              </Typography>
            </Button>
          </Box>
          <Box display='flex' justifyContent='center' mb={5}>
            <Typography sx={{ color: "loginLabelColor.main" }}>
              v 1.0.0.0 | {moment(new Date()).format("DD/MM/YYYY")}
            </Typography>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Login;