import React, { useState } from 'react';

import { RiUserFill, RiLockPasswordFill } from 'react-icons/ri';

import '../Styles/Login.scss';
import { Button } from '@mui/material';

import { userlogin } from '../Actions/Colaborador/Colaborador-api';

const Login = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div className="login-form">
      <div className="login-box">
        <h1 className="company-title">Ubikate</h1>
        <h2 className="login-title">Iniciar sesión</h2>
        <form>
          <div className="form-group">
            <span className="input-icon">
              <RiUserFill />
            </span>
            <input
              value={user}
              onChange={onChange}
              name="user"
              type="text"
              placeholder="Usuario"
            />
          </div>
          <div className="form-group">
            <span className="input-icon">
              <RiLockPasswordFill />
            </span>
            <input
              value={password}
              onChange={onChange}
              type="password"
              name="password"
              placeholder="Contraseña"
            />
          </div>
          <a href="/recuperar-contrasena" className="forgot-password-link">
            ¿Olvidaste tu contraseña?
          </a>
          <Button className="login-button" onClick={handleLogin}>
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;