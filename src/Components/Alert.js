import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import '../Styles/alerta.scss'

function MessageAlert(props) {
  
  console.log("props", props)
  return (
    <Stack className="component-alert" sx={{ width: '50%' }} spacing={2}>
        <Alert severity={props.typeMessage}>
          <AlertTitle>{props.message}</AlertTitle>
        </Alert>
    </Stack>
  );
}

export default MessageAlert;
