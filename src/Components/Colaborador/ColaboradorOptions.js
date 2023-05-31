import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography, Grid, Box } from "@mui/material";

export default function ColaboradorOptions(props) {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
  };

  const submitEdit = (e) =>{
      props.submit(e) 
  }

  return (
    <>
        {props.seccion !=="password" && (<Grid item xs={6}>
            <Box display="flex" alignItems="center" justifyContent="space-between" p={3}>
            <div className='colaborador-texto'>Id Usuario : {props.colaborador.codigoUsuario}</div>
            </Box>
        </Grid>)}
        <Grid item xs={props.seccion !=="password" ? 6 : 12}>
            <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{paddingRight:3}}>
                <Button sx={{width: props.seccion !== "password" ? '100px' : '200px', height:'50px', borderRadius:'20px'}} variant="contained" size="small" onClick={submitEdit}>
                    <Typography variant="button" sx={{ textTransform: 'none' }}>{capitalize(props.mensaje)}</Typography>
                </Button>
            </Box>
        </Grid>
    </>
  )
}
