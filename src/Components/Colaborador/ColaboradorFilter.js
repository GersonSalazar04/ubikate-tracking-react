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
import CircleIcon from '@mui/icons-material/Circle';
import { KeyboardArrowDown } from '@mui/icons-material';
import AddEditColaboradorModal from './AddEditColaboradorModal';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function ColaboradorFilter() {

  const [selectFilter, setSelectFilter] = React.useState('');
  const [colaboradores, setColaboradores] = useState([]);
  const [dataInicialCol, setdataInicialCol] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
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

  const handleAddEditColaboradorClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} pl={0} pr={0} pb={0} pt={0} >
          <Typography variant="body1" component="div" sx={{ backgroundColor: "background.paper" }} className='colaboradores-total-container'>
            <div >Colaboradores totales</div>
            <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '1.2em' }}>{colaboradores.totalRegistros}</div>
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center" justifyContent="space-between" my={4}>
          <Grid xs={2} display="flex" alignItems="center" justifyContent="flex-start">
            <Box display="flex" alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
              <PeopleOutlineOutlinedIcon color='secondary' />
              <div style={{ fontWeight: 'bold' }}>Colaboradores</div>
              <Button onClick={()=> setOpen(true)}><AddIcon color='secondary' /></Button>
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
              <FormControl sx={{ minWidth: 200 }}>
                <Select
                  className='colaborador-select'
                  value={selectFilter}
                  onChange={handleChange}
                  IconComponent={KeyboardArrowDown}
                  displayEmpty
                  inputProps={{ 'aria-label': 'without label' }}
                  sx={{
                    borderRadius: '30px', 
                    "& .MuiSelect-icon": {
                      color: '#ffffff',
                    },
                  }}
                >
                  <MenuItem value={'A'}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CircleIcon sx={{ color: 'customGreen.main', marginRight: '5px', fontSize: '0.8em' }} />
                      <div>Habilitado</div>
                    </div>
                  </MenuItem>
                  <MenuItem value={'E'}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CircleIcon sx={{ color: 'customRed.main', marginRight: '5px', fontSize: '0.8em' }} />
                      <div>Inhabilitado</div>
                    </div>
                  </MenuItem>
                  <MenuItem value="">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CircleIcon sx={{ color: 'customGray.main', marginRight: '5px', fontSize: '0.8em' }} />
                      <div>Por defecto</div>
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" >
              <OutlinedInput
                sx={{ borderRadius: '30px' }}
                className='colaborador-search-input'
                placeholder="Buscar"
                onChange={handleSearch}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon color='secondary' />
                  </InputAdornment>
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ColaboradorTable
          colaboradores={colaboradores}
          loading={loading}
        />
      </Grid>
      <AddEditColaboradorModal 
        open={open} 
        action="add"
        handleClose={handleAddEditColaboradorClose} 
        actionButtonName={"Guardar"} 
        secondActionName={"Cancelar"}
        secondActionFunction={handleAddEditColaboradorClose}
        icon={<AddOutlinedIcon color="secondary"/>}
        title="Agregar colaborador"
        />
    </>
  )
}
