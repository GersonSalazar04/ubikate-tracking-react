import React, { useState } from 'react';
import { Grid, Button, OutlinedInput, Box, Paper, Typography } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
import { obtenerMarcas } from '../../Actions/Marca/Marca-api';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AddIcon from '@mui/icons-material/Add';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const columns = [
    { field: 'situacionRegistro', headerName: 'Tipo Doc id', flex: 1 },
    { field: 'idEmpleado', headerName: 'Doc id', flex: 1 },
    { field: 'nombreEmpleado', headerName: 'Nombre', flex: 1 },
    {
      field: 'fechaRegistro',
      headerName: 'Fecha',
      valueGetter: (params) => dayjs(params.row && params.row.fechaRegistro).format('DD/MM/YYYY'),
      flex: 1,
    },
    {
      field: '',
      headerName: 'Hora',
      valueGetter: (params) => dayjs(params.row && params.row.fechaRegistro).format('HH:mm a'),
      flex: 1,
    },
  ];

export default function MarcasPage() {

    function getFormattedDate(date) {
        const year = dayjs(date).year();
        const month = dayjs(date).month();
        const day = dayjs(date).date();
  
        const formattedYear = year.toString();
        const formattedMonth = month < 10 ? `0${month}` : month.toString();
        const formattedDay = day < 10 ? `0${day}` : day.toString();
    
        const formattedDate = formattedYear + formattedMonth + formattedDay;
  
        return formattedDate;
    };
  
    const [marcas, setMarcas] = useState({});
    const [fechaInicio, setFechaInicio] = useState(dayjs());
    const [fechaFin, setFechaFin] = useState(dayjs());
    const [nombreEmpleado, setNombreEmpleado] = useState("");

    const onChangeFechaInicio = (date) => {
        setFechaInicio(date);
    }
    
    const onChangeFechaFin = (date) => {
        setFechaFin(date);
    }
    
    const onChangeNombre = (event) => {
        setNombreEmpleado(event.target.value);
    }
     
    const disabledDates = (date) => {
        const itemDate = getFormattedDate(date);
        const startDate = fechaInicio ? getFormattedDate(fechaInicio) : Number.MAX_VALUE;
        return startDate && itemDate < startDate;
    };
    
    const filterMarcas = async () => {
        let filteredData = [];
        const startDate = fechaInicio ? fechaInicio.toDate() : "";
        const endDate = fechaFin ? fechaFin.toDate() : "";
        const filters = {fechaInicio: startDate, fechaFin: endDate, nombre: nombreEmpleado};
        const data = await obtenerMarcas(filters);
        filteredData = data.resultados;
    
        setMarcas((prevMarcas) => ({
          ...prevMarcas,
          resultados: filteredData,
          totalRegistros: filteredData.length
        }));
    }

    return (
      <>
        <Grid container styles={{color:'#044B6E'}} >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} pl={0} pr={0} pb={0} pt={0} >
              <Typography variant="body1" component="div" sx={{ backgroundColor: "background.paper" }} className='colaboradores-total-container'>
                  <div >Marcas totales</div>
                  <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '1.2em' }}>{marcas.totalRegistros || 0}</div>
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center" justifyContent="space-between" my={4}>
              <Grid xs={2} display="flex" alignItems="center" justifyContent="flex-start">
                <Box display="flex" alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
                  <ChecklistIcon color='secondary' />
                  <div style={{ fontWeight: 'bold' }}>Marcas</div>
                  <Button><AddIcon color='secondary' /></Button>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" p={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                      <DatePicker
                        label="Fecha inicio"
                        value={fechaInicio}
                        format='DD/MM/YYYY'
                        onChange={onChangeFechaInicio}
                        disableFuture
                      />
                      <DatePicker
                        label="Fecha fin"
                        value={fechaFin}
                        format='DD/MM/YYYY'
                        onChange={onChangeFechaFin}
                        disableFuture
                        shouldDisableDate={disabledDates}
                      />
                      </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid xs={10} display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
                <Button className="export-button" color='secondary' variant="contained" size="small" sx={{ borderRadius: '30px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IosShareIcon sx={{ mr: 1, color: "secondaryTextColor.main" }} />
                    <Typography variant="button" sx={{ textTransform: 'none', color: "secondaryTextColor.main", fontWeight: '700', fontSize: '1.2em' }}>Exportar a Excel</Typography>
                  </Box>
                </Button>    
                <Box display="flex" alignItems="center" justifyContent="center" >
                  <OutlinedInput
                    sx={{ borderRadius: '30px' }}
                    className='colaborador-search-input'
                    placeholder="Buscar"
                    onChange={onChangeNombre}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon color='secondary' />
                      </InputAdornment>
                    }
                  />
                </Box>  
                {/* <Grid item xs={2}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" sx={{borderRadius: '20px', paddingLeft: '40px'}} p={3}>
                    <Button variant="contained" size="small" onClick={filterMarcas}>Buscar</Button>
                  </Box>
                </Grid> */}
              </Grid>
            </Grid>
            <Box display="flex" alignItems="center" style={{ height: 550, width: '100%' }}>
              <DataGrid
                rows={marcas && marcas.resultados || []}
                columns={columns}
                //onRowClick={handleRowClick}
                getRowId={(row) => row.codSecuencial}
              />
            </Box>
          </Grid>
        </Grid> 
      </>
    )
}