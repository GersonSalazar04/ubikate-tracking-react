import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Button } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ColaboradorOptions from '../../Components/Colaborador/ColaboradorOptions';
import { useParams } from 'react-router-dom';
import { getColaboradorById, updateColaborador, updatePasswordColaborador } from '../../Actions/Colaborador/Colaborador-api';
import OutlinedInput from '@mui/material/OutlinedInput';
import './../../Styles/Colaboradores.scss';
import MultipleSelectChip from '../../Components/Colaborador/Agrupadores'
import AlertMessage from '../../Components/Alert'
import Select from '@mui/material/Select';  
import MenuItem from '@mui/material/MenuItem';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { v4 as uuidv4 } from 'uuid';
import { capitalize } from 'lodash';

export default function Info() {
    const { id } = useParams();
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
            agrupador: '',
            situacionRegistro: 'A',
            rol: '1',
            password:'',
            verifyPassword:'',
            tipoDocumento:'1',
    });


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

    useEffect(() => {
        const fetchColaborador = async () => {
            try {
                const data = await getColaboradorById(id);
                setColaborador(data);
                const ubicacion = data.indicadorUbicacion === 1;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    numeroDocumentoIdentidad: data.numeroDocumentoIdentidad,
                    apellidoMaterno: data.apellidoMaterno,
                    apellidoPaterno: data.apellidoPaterno,
                    nombres: data.nombres,
                    numeroTelefono: data.numeroTelefono,
                    indicadorUbicacion: ubicacion || false,
                    correo: data.correo,
                    agrupador: '',
                    situacionRegistro: data.situacionRegistro,
                    rol: '1',
                    tipoDocumento: data.tipoDocumento
                    }));
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchColaborador();
    }, [id]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const ubicacion = formData.indicadorUbicacion ? 1 : 0
        const updateData = {...formData, indicadorUbicacion:ubicacion}
        try {
            const response = await updateColaborador(id, updateData);
            if(response){
                console.log("ingreso")
                setAlertMessage('Colaborador Actualizado Correctamente.');
                setTypeMessage("success")
                setShowAlert(true);
            }
          } catch (error) {
            setAlertMessage('Error al actualizar el colaborador');
            setTypeMessage("error")
            setShowAlert(true);
          }

          setTimeout(() => {setShowAlert(false);}, 3000);
    }

    const handleSubmitPassword = async(e) => {
        e.preventDefault();
        const password = formData.password;
        const verifyPassword = formData.verifyPassword;
        if(password !== verifyPassword){
            setAlertMessage('Las contraseñas no coinciden');
            setTypeMessage("error")
            setShowAlert(true);
            setTimeout(() => {setShowAlert(false);}, 3000);
            return
        }
        try {
            const data = {clave: formData.password}
            const response = await updatePasswordColaborador(id, data);
            if(response){
                console.log("ingreso")
                setAlertMessage(response.mensaje);
                setTypeMessage("success")
                setShowAlert(true);
            }
        } catch (error) {
            setAlertMessage('Error al actualizar el colaborador');
            setTypeMessage("error")
            setShowAlert(true);
        }
        setTimeout(() => {
            setShowAlert(false);
            setFormData({
                ...formData,
                'password': '',
                'verifyPassword': '',
              });
        }, 3000);
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

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Grid container className='generalForm'>
                    <ColaboradorOptions 
                        colaborador={colaborador}
                        submit={handleSubmit}
                        seccion={"info"}
                        mensaje="Editar"
                    />
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
            <form onSubmit={(e) => handleSubmitPassword(e)}>
                <Grid container className='generalForm'>
                    <ColaboradorOptions 
                        colaborador={colaborador}
                        submit={handleSubmitPassword}
                        seccion={"password"}
                        mensaje="Actualizar Contraseña"
                    />
                    <Grid item xs={3} style={{display:'flex'}}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                            <Typography className='colaborador-texto'>
                                Contraseña:*
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                            <OutlinedInput 
                                name="password"
                                onChange={(e) => handleInputChange(e)}
                                className='colaborador-input'
                                sx={{borderRadius: '20px'}}
                                value={formData.password}
                                type={'password'}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={3} style={{display:'flex'}}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                            <Typography className='colaborador-texto'>
                                Repetir contraseña:*
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" pt={1} pb={1} pl={3} pr={3}>
                            <OutlinedInput 
                                name="verifyPassword"
                                onChange={(e) => handleInputChange(e)}
                                sx={{borderRadius: '20px'}}
                                value={formData.verifyPassword}
                                className='colaborador-input'
                                type={'password'}
                            />
                        </Box>
                    </Grid>     
                </Grid>
            </form>
        </>
        
    );
}
