import React, { useState, useEffect } from 'react';
import { Grid, Button, OutlinedInput, Box } from "@mui/material";
import Mapa from './Mapa';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { obtenerMarcas } from '../../Actions/Marca/Marca-api';
import 'dayjs/locale/es';

dayjs.locale('es');

const columns = [
  { field: 'situacionRegistro', headerName: 'Tipo Doc id', width: 90 },
  { field: 'idEmpleado', headerName: 'Doc id', width: 150 },
  { field: 'nombreEmpleado', headerName: 'Nombre', width: 300 },
  {
    field: 'fechaRegistro',
    headerName: 'Fecha',
    valueGetter: (params) => dayjs(params.row && params.row.fechaRegistro).format('DD/MM/YYYY'),
    width: 160,
  },
  {
    field: '',
    headerName: 'Hora',
    valueGetter: (params) => dayjs(params.row && params.row.fechaRegistro).format('HH:mm a'),
    width: 160,
  },
];

export default function MarcasTable() {

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
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState({});
  const [coords, setCoords] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(dayjs());
  const [fechaFin, setFechaFin] = useState(dayjs());
  const [nombreEmpleado, setNombreEmpleado] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCoords([latitude, longitude]);
    });
  }, []);

  const handleRowClick = (params, event) => {
    const rowSelected = params && params.row || {};
    setCoords([rowSelected.latitud, rowSelected.longitud]);
  };

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
      <Grid container xs={12} spacing={2}>
       <Grid item xs={6}>
        <Grid container>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
              <OutlinedInput
                sx={{borderRadius: '5px'}}
                value={nombreEmpleado}
                onChange={onChangeNombre}
                placeholder="Nombre"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" p={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs} locale='es'>
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
          <Grid item xs={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{borderRadius: '20px', paddingLeft: '40px'}} p={3}>
              <Button variant="contained" size="small" onClick={filterMarcas}>Buscar</Button>
            </Box>
          </Grid>
          <Box display="flex" alignItems="center" style={{ height: 700, width: '100%' }}>
            <DataGrid
              rows={marcas && marcas.resultados || []}
              columns={columns}
              onRowClick={handleRowClick}
              getRowId={(row) => row.codSecuencial}
            />
          </Box>
        </Grid>
        <Button variant="text" startIcon={<InsertDriveFileIcon />}>Reporte Marcas</Button>
       </Grid>
       <Grid item xs={6}>
        <Mapa coords={coords}></Mapa>
       </Grid>
      </Grid>
    </>
  );
}
