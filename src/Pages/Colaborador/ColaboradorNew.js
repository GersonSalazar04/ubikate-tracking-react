import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';  
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MultipleSelectChip from '../../Components/Colaborador/Agrupadores'
import AlertMessage from '../../Components/Alert'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ControlPointSharp } from '@mui/icons-material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { v4 as uuidv4 } from 'uuid';

export default function ColaboradorNew () {

    const [colaborador, setColaborador] = useState({});
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [typeMessage , setTypeMessage] = useState('');
    const [roleRows, setRoleRows] = useState([{id: 1, role: '', agrupador: []}]); 
    const [selectedRoles, setSelectedRoles] = useState([]);

    const [formData, setFormData] =useState({
        numeroDocumentoIdentidad: '',
        apellidoMaterno: '',
        apellidoPaterno: '',
        nombres: '',
        numeroTelefono: '',
        indicadorUbicacion: false,
        correo: '',
        agrupador: [],
        situacionRegistro: 'A',
        rol: '1',
        password:'',
        verifyPassword:'',
        tipoDocumento:'1',
});


    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            numeroDocumentoIdentidad: '',
            apellidoMaterno: '',
            apellidoPaterno: '',
            nombres: '',
            numeroTelefono: '',
            indicadorUbicacion: false,
            correo: '',
            agrupador: [],
            situacionRegistro: '',
            rol: '1',
            tipoDocumento: ''
            }));
    }, []);

    const newColaborador = () => {

    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("name", name)
        console.log("value", value)
        setFormData({
          ...formData,
          [name]: value
        });
      };

    const handleCheckBox = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked
          });
    }

    const agrupadores = [
        'Chorrillos',
        'Cercado de Lima',
      ];

    const handleSubmit = async(e) => {
        // e.preventDefault();
        // const ubicacion = formData.indicadorUbicacion ? 1 : 0
        // const updateData = {...formData, indicadorUbicacion:ubicacion}
        // try {
        //     const response = await updateColaborador(id, updateData);
        //     if(response){
        //         console.log("ingreso")
        //         setAlertMessage('Colaborador Actualizado Correctamente.');
        //         setTypeMessage("success")
        //         setShowAlert(true);
        //     }
        //   } catch (error) {
        //     setAlertMessage('Error al actualizar el colaborador');
        //     setTypeMessage("error")
        //     setShowAlert(true);
        //   }

        //   setTimeout(() => {setShowAlert(false);}, 3000);
    }

    const [lista, setLista] = useState([]);

    const agregarElemento = (e) => {
        e.preventDefault()

        const existeRol = lista.length > 0 && lista.find(value=> value.rol === formData.rol)
        if(existeRol){
            console.log("existe el rol")
            setAlertMessage('El Rol ya se encuentra seleccionado');
            setTypeMessage("error")
            setShowAlert(true);
            setTimeout(() => {setShowAlert(false);}, 3000);
            return
        }

        if (formData.rol !== '' && formData.agrupador.length > 0) {
            const nuevoElemento = {
                rol: formData.rol,
                agrupador: formData.agrupador.join(', ')
            };
            setLista([...lista, nuevoElemento]);
            setFormData({
                ...formData,
                rol:'Administrador',
                agrupador: []
            })
        }
    };

    const eliminarElemento = (e, index) => {
        e.preventDefault()
        const nuevaLista = [...lista];
        nuevaLista.splice(index, 1);
        setLista(nuevaLista);
      };

    const handleChipDelete = (data) => {
        setFormData({
            ...formData,
            agrupador: data
        })
    } 

    const addNewRoleRow = () => {
        const newRow = {
            id: uuidv4(),
            role: '',
            agrupador: []
        };
        setRoleRows([...roleRows, newRow]);
    }

    const removeRoleRow = (id) => {
        const updatedRows = roleRows.filter((row) => row.id !== id);
        setRoleRows(updatedRows);
        const updatedSelectedRoles = selectedRoles.filter((role) => role.rowId !== id);
        setSelectedRoles(updatedSelectedRoles);
    }

    const handleRoleChange = (e, rowId) => {
        const { value } = e.target;
        setSelectedRoles([...selectedRoles, {rowId: rowId, value: value}])
        const updatedRows = roleRows.map((row) => {
            if (row.id === rowId) {
                return {
                    ...row,
                    role: value,
                };
            }
            return row;
        });
        setRoleRows(updatedRows);
    };

    return(
        <>
            <Grid container>
                <Paper variant="outlined" square sx={{backgroundColor:'#066C9E', width:'100%', height:'8vh', borderTopLeftRadius:'20px', borderTopRightRadius:'20px'}}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" p={1}>
                        <div className='colaborador-nuevo-texto'>Nuevo Colaborador</div>
                        <Button sx={{width:'100px', height:'50px', borderRadius:'20px'}} variant="contained" size="small" onClick={newColaborador}>
                            <Typography variant="button" sx={{ textTransform: 'none' }}>{capitalize("Nuevo")}</Typography>
                        </Button>
                    </Box>
                </Paper>
                <Paper variant="outlined" square sx={{backgroundColor:'#066C9E', width:'100%', height:'auto'}} p={3}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Grid container className='generalForm'>
                            <Grid item xs={3} style={{display:'flex'}}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Typography className='colaborador-texto'>
                                        Tipo Doc.Identidad:*
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Select
                                        className='colaborador-select-form'
                                        name="tipoDocumento"
                                        value={formData.tipoDocumento}
                                        onChange={(e) => handleInputChange(e)}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'without label' }}
                                        sx={{borderRadius: '20px'}}
                                    >
                                        <MenuItem value={'1'}>DNI</MenuItem>
                                        <MenuItem value={'2'}>CARNET DE EXTRANJERIA</MenuItem>
                                    </Select>
                                </Box>
                            </Grid>
                            <Grid item xs={3} style={{display:'flex'}}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Typography className='colaborador-texto'>
                                        Doc. Identidad:*
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <OutlinedInput 
                                        name="numeroDocumentoIdentidad"
                                        onChange={(e) => handleInputChange(e)}
                                        className='colaborador-input'
                                        sx={{borderRadius: '20px'}}
                                        value={formData.numeroDocumentoIdentidad}
                                        disabled={false}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={3} style={{display:'flex'}}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Typography className='colaborador-texto'>
                                        Ap. Materno:*
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <OutlinedInput 
                                        name="apellidoMaterno"
                                        onChange={(e) => handleInputChange(e)}
                                        sx={{borderRadius: '20px'}}
                                        value={formData.apellidoMaterno}
                                        className='colaborador-input'
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={3} style={{display:'flex'}}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Typography className='colaborador-texto'>
                                        Ap. Paterno:*
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <OutlinedInput 
                                        name="apellidoPaterno"
                                        onChange={(e) => handleInputChange(e)}
                                        sx={{borderRadius: '20px'}}
                                        value={formData.apellidoPaterno}
                                        className='colaborador-input'
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={3} style={{display:'flex'}}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Typography className='colaborador-texto'>
                                        Nombres:*
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <OutlinedInput
                                        name="nombres"
                                        onChange={(e) => handleInputChange(e)} 
                                        sx={{borderRadius: '20px'}}
                                        value={formData.nombres}
                                        className='colaborador-input'
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={3} style={{display:'flex'}}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Typography className='colaborador-texto'>
                                        Correo:*
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <OutlinedInput 
                                        name="correo"
                                        onChange={(e) => handleInputChange(e)}
                                        sx={{borderRadius: '20px'}}
                                        value={formData.correo}
                                        className='colaborador-input'
                                        disabled={false}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={3} style={{display:'flex'}}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Typography className='colaborador-texto'>
                                        Telefono:
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <OutlinedInput 
                                        name="numeroTelefono"
                                        onChange={(e) => handleInputChange(e)}
                                        sx={{borderRadius: '20px'}}
                                        value={formData.numeroTelefono}
                                        className='colaborador-input'
                                        disabled={false}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={3} style={{display:'flex'}}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Typography className='colaborador-texto'>
                                        Ubicacion:*
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                <FormControlLabel  
                                    control={
                                        <Checkbox
                                            name="indicadorUbicacion"
                                            checked={formData.indicadorUbicacion}
                                            onChange={handleCheckBox}
                                        />
                                    }
                                    label="Ubicacion" 
                                />
                                </Box>
                            </Grid>
                            <Grid item xs={3} style={{display:'flex'}}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Typography className='colaborador-texto'>
                                        Estado:
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                    <Select
                                        className='colaborador-select-form'
                                        name="situacionRegistro"
                                        value={formData.situacionRegistro}
                                        onChange={(e) => handleInputChange(e)}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'without label' }}
                                        sx={{borderRadius: '20px'}}
                                    >
                                        <MenuItem value={'A'}>Habilitado</MenuItem>
                                        <MenuItem value={'E'}>Inhabilitado</MenuItem>
                                    </Select>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <hr className="separador" />
                            </Grid>
                            <Grid item xs={12} ml={2}>
                                <Button sx={{ width: '100px', height: '50px', borderRadius: '20px' }} variant="contained" size="small" onClick={addNewRoleRow} disabled={roleRows.length >= 3}>
                                    <Typography variant="button" sx={{ textTransform: 'none' }}>{capitalize("Añadir")}</Typography>
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    roleRows.map((row) => (
                                        <Grid key={row.id} item xs={12} style={{ display: 'flex' }}>
                                            <Grid item xs={2} style={{ display: 'flex' }}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                                    <Typography className='colaborador-texto'>
                                                        Rol:
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                                    <Select
                                                        className='colaborador-select-form'
                                                        name="rol"
                                                        value={row.role}
                                                        onChange={(e) => handleRoleChange(e, row.id)}
                                                        displayEmpty
                                                        inputProps={{ 'aria-label': 'without label' }}
                                                        sx={{ borderRadius: '20px' }}
                                                    >
                                                        <MenuItem value={'1'} disabled={ selectedRoles.find(role => role.value === '1')!== undefined }>Administrador</MenuItem>
                                                        <MenuItem value={'2'} disabled={ selectedRoles.find(role => role.value === '2')!== undefined }>Supervisor</MenuItem>
                                                        <MenuItem value={'3'} disabled={ selectedRoles.find(role => role.value === '3')!== undefined }>Colaborador</MenuItem>
                                                    </Select>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={3} style={{ display: 'flex' }}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                                    <Typography className='colaborador-texto'>
                                                        Agrupador:
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                                                    <MultipleSelectChip
                                                        options={agrupadores}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={1} style={{ display:"flex", alignItems:"center", justifyContent: "center" }}>
                                                <Button sx={{ width: '50px', height: '50px', borderRadius: '20px' }} variant="contained" size="small" onClick={() => removeRoleRow(row.id)} disabled={roleRows.length === 1}>
                                                    <RemoveCircleIcon/>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    ))
                                }

                            </Grid>
                            <Grid item xs={12}>
                                <hr className="separador" />
                            </Grid>
                            {showAlert && (
                                <AlertMessage
                                    message={alertMessage}
                                    typeMessage={typeMessage}
                                />
                            )}
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </>
    )
}