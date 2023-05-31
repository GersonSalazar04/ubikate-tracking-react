import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header() {

    return (
        <>
            <AppBar position="static" sx={{ width: '100%' }}>
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Mi Aplicación
                </Typography>
                <Button color="inherit">Inicio</Button>
                <Button color="inherit">Acerca de</Button>
                <Button color="inherit">Contacto</Button>
                </Toolbar>
            </AppBar>
        </>
    );
}