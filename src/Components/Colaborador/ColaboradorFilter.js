import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography, Grid, Box, IconButton } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import ColaboradorTable from './ColaboradorTable';
import { getColaborador } from '../../Actions/Colaborador/Colaborador-api';
import { debounce } from 'lodash';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import IosShareIcon from '@mui/icons-material/IosShare';
import './../../Styles/Colaboradores.scss';
import { useNavigate } from 'react-router-dom';

export default function ColaboradorFilter() {

  const [selectFilter, setSelectFilter] = React.useState('');
  const [colaboradores, setColaboradores] = useState([]);
  const [dataInicialCol, setdataInicialCol] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
      const fetchColaboradores = async () => {
          try {
              const data = await getColaborador();
              setColaboradores(data);
              setdataInicialCol(data)
              setLoading(false);
          } catch (error) {
              console.error(error);
              setLoading(false);
          }
      };
          fetchColaboradores();
  }, []);

  const handleSearch = debounce((event) => {
    setBusqueda(event.target.value);
    filtrarColaboradores(event.target.value);
  },3000);

const filtrarColaboradores = (search) => {

  const filteredResults = dataInicialCol && 
    dataInicialCol.resultados && 
    dataInicialCol.resultados.length > 0 &&
    dataInicialCol.resultados.filter((colaborador) => {
    for (let key in colaborador) {
      if ((key ==='apellidoMaterno' || key ==='apellidoPaterno' || key ==='numeroDocumentoIdentidad' ||
        key ==='nombres' || key ==='correo') &&
        colaborador[key] &&
        colaborador[key]
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });

  setColaboradores((prevColaboradores) => ({
    ...prevColaboradores,
    resultados: filteredResults,
    totalRegistros: filteredResults.length
  }));
};

  const handleChange = (event) => {
    setSelectFilter(event.target.value);

    if(event.target.value){
      const filterColab = dataInicialCol && 
        dataInicialCol.resultados && 
        dataInicialCol.resultados.length > 0 && 
        dataInicialCol.resultados.filter(res=> res.situacionRegistro===event.target.value)

      setColaboradores((prevColaboradores) => ({
        ...prevColaboradores,
        resultados: filterColab,
        totalRegistros: filterColab.length
      }));
    } else {
      setColaboradores(dataInicialCol)
    }
    
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
  };

  const newColaborador = () => {
    navigate(`/colaborador/new`);
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} pl={0} pr={0} pb={0} pt={0}>
        <Typography className="typografy-colaborador" variant="body1" component="div">
            <div className="colaborador-texto" style={{ fontWeight: 'bold'}}>Colaboradores totales</div>
            <div className="colaborador-texto" style={{ marginTop: '8px'}}>{colaboradores.totalRegistros}</div>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between" p={3}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PeopleOutlineOutlinedIcon className="colaborador-texto"/>
            <div className="texto-menu-colaborador">Colaboradores</div>
            <Button onClick={newColaborador}><AddIcon className="colaborador-texto"/></Button>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3}>
      <Box display="flex" alignItems="center" justifyContent="center" p={3}>
        <Button className="colaborador-boton" variant="contained" size="small" sx={{borderRadius: '20px'}}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IosShareIcon sx={{ mr: 1, fontSize:'medium' }}/>
            <Typography variant="button" sx={{ textTransform: 'none' }}>{capitalize('Exportar a Excel')}</Typography>
          </Box>
        </Button> 
      </Box>
      </Grid>
        <Grid item xs={12} sm={3}>
          <Box display="flex" alignItems="center" justifyContent="center" p={3}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                className='colaborador-select'
                value={selectFilter}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'without label' }}
                sx={{borderRadius: '20px'}}
              >
                <MenuItem value={'A'}>Habilitado</MenuItem>
                <MenuItem value={'E'}>Inhabilitado</MenuItem>
                <MenuItem value="">Por defecto</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box display="flex" alignItems="center" justifyContent="center" p={3}>
          <OutlinedInput 
          sx={{borderRadius: '20px'}}
            className='colaborador-input'
            placeholder="Buscar" 
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
          <ColaboradorTable
            colaboradores={colaboradores}
          />
      </Grid>
    </>
  )
}
