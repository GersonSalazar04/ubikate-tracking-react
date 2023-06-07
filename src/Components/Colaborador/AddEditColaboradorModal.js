import { Box, CircularProgress, Grid, MenuItem, OutlinedInput, Select, Switch, Typography } from "@mui/material";
import GeneralModal from "../GeneralModal";
import MultipleSelectChip from "./Agrupadores";
import { useEffect, useState } from "react";
import { getColaboradorById } from "../../Actions/Colaborador/Colaborador-api";

const AddEditColaboradorModal = (props) => {
    const { open, handleClose, actionButtonName, secondActionName, icon, id, title, action, secondActionFunction } = props;

    const [loading, setLoading] = useState(false);
    const [colaboradorData, setColaboradorData] = useState({
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
        password: '',
        verifyPassword: '',
        tipoDocumento: '1',
    })


    useEffect(() => {
        if (id !== '' && action !== 'add') {
            setLoading(true)
            const fetchColaborador = async () => {
                try {
                    const data = await getColaboradorById(id);
                    const ubicacion = data.indicadorUbicacion === 1;
                    setColaboradorData((prevFormData) => ({
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
                    setLoading(false)
                } catch (error) {
                    console.error(error);
                    setLoading(false)
                }
            };
            fetchColaborador();
        }
    }, [id, action])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setColaboradorData({
            ...colaboradorData,
            [name]: value
        });
    };

    const handleSwitch = (e) => {
        const { name, checked } = e.target;
        setColaboradorData({
            ...colaboradorData,
            [name]: checked
        });
    }

    const typographyStyle = {
        marginBottom: 1,
        marginTop: 1,
        fontWeight: 700
    }
    const agrupadores = [
        'Chorrillos',
        'Cercado de Lima',
        'Breña',
        'Miraflores',
    ];
    return (
        <GeneralModal
            open={open}
            icon={icon}
            title={title}
            footer={action !== 'view'}
            handleClose={() => {
                handleClose()
                setLoading(false)
            }}
            successButtonName={actionButtonName}
            secondActionButtonName={secondActionName}
            secondActionFunction={secondActionFunction}>
            {
                loading && action !== 'add' ? <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                    <CircularProgress color="secondary" />
                </Box> : <Grid container xs={11} md={10} margin="auto" spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            Tipo de Doc. de Identidad
                        </Typography>
                        {
                            action !== 'view' ? <Select
                                size="small"
                                className='colaborador-select-form'
                                name="tipoDocumento"
                                value={parseInt(colaboradorData.tipoDocumento, 10)}
                                inputProps={{ 'aria-label': 'without label' }}
                                sx={{ borderRadius: '20px' }}
                                onChange={(e) => handleInputChange(e)}
                            >
                                <MenuItem value={'1'}>DNI</MenuItem>
                                <MenuItem value={'2'}>CARNET DE EXTRANJERIA</MenuItem>
                            </Select> :
                                <Typography>
                                    {parseInt(colaboradorData.tipoDocumento, 10) === 1 ? 'DNI' : 'CARNET DE EXTRANJERÍA'}
                                </Typography>
                        }

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            Nro. de Doc. de Identidad
                        </Typography>
                        {action !== 'view' ? <OutlinedInput
                            size="small"
                            className="colaborador-input"
                            name="numeroDocumentoIdentidad"
                            value={colaboradorData.numeroDocumentoIdentidad}
                            sx={{ borderRadius: '20px' }}
                            onChange={(e) => handleInputChange(e)}
                        /> : <Typography>
                            {colaboradorData.numeroDocumentoIdentidad}
                        </Typography>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            Nombres
                        </Typography>
                        {action !== 'view' ? <OutlinedInput
                            size="small"
                            className="colaborador-input"
                            name="nombres"
                            value={colaboradorData.nombres}
                            sx={{ borderRadius: '20px' }}
                            onChange={(e) => handleInputChange(e)}
                        /> : <Typography>
                            {colaboradorData.nombres}
                        </Typography>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            Apellido paterno
                        </Typography>
                        {action !== 'view' ? <OutlinedInput
                            size="small"
                            className="colaborador-input"
                            name="apellidoPaterno"
                            value={colaboradorData.apellidoPaterno}
                            sx={{ borderRadius: '20px' }}
                            onChange={(e) => handleInputChange(e)}
                        /> : <Typography>
                            {colaboradorData.apellidoPaterno}
                        </Typography>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            Apellido materno
                        </Typography>
                        {action !== 'view' ? <OutlinedInput
                            size="small"
                            className="colaborador-input"
                            name="apellidoMaterno"
                            value={colaboradorData.apellidoMaterno}
                            sx={{ borderRadius: '20px' }}
                            onChange={(e) => handleInputChange(e)}
                        /> : <Typography>
                            {colaboradorData.apellidoMaterno}
                        </Typography>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            Correo
                        </Typography>
                        {action !== 'view' ? <OutlinedInput
                            size="small"
                            className="colaborador-input"
                            name="correo"
                            value={colaboradorData.correo}
                            sx={{ borderRadius: '20px' }}
                            onChange={(e) => handleInputChange(e)}
                        /> : <Typography>
                            {colaboradorData.correo}
                        </Typography>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            Celular
                        </Typography>
                        {action !== 'view' ? <OutlinedInput
                            size="small"
                            className="colaborador-input"
                            name="numeroTelefono"
                            value={colaboradorData.numeroTelefono}
                            sx={{ borderRadius: '20px' }}
                            onChange={(e) => handleInputChange(e)}
                        /> : <Typography>
                            {colaboradorData.numeroTelefono}
                        </Typography>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            Estado
                        </Typography>
                        {action !== 'view' ? <Select
                            size="small"
                            className='colaborador-select-form'
                            name="situacionRegistro"
                            inputProps={{ 'aria-label': 'without label' }}
                            value={colaboradorData.situacionRegistro}
                            sx={{ borderRadius: '20px' }}
                            onChange={(e) => handleInputChange(e)}
                        >
                            <MenuItem value={'A'}>Habilitado</MenuItem>
                            <MenuItem value={'E'}>Inhabilitado</MenuItem>
                        </Select> : <Typography>
                            {colaboradorData.situacionRegistro === 'A' ? 'Habilitado' : 'Inhabilitado'}
                        </Typography>}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            Rol
                        </Typography>
                        {action !== 'view' ? <Select
                            size="small"
                            className='colaborador-select-form'
                            name="tipoDocumento"
                            value={1}
                            inputProps={{ 'aria-label': 'without label' }}
                            sx={{ borderRadius: '20px' }}
                        >
                            <MenuItem value={'1'}>Administrador</MenuItem>
                            <MenuItem value={'2'}>Supervisor</MenuItem>
                            <MenuItem value={'3'}>Colaborador</MenuItem>
                        </Select> : <Typography>
                            Administrador
                        </Typography>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            Grupos
                        </Typography>
                        {action !== 'view' ? <MultipleSelectChip
                            options={agrupadores}
                        /> : null}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyStyle}>
                            ¿Mostrar ubicación?
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="inherit" sx={{ fontSize: "1.2em" }}>No</Typography>
                            <Switch name="indicadorUbicacion" color="secondary" onChange={handleSwitch} checked={colaboradorData.indicadorUbicacion} disabled={action === 'view'} />
                            <Typography variant="inherit" sx={{ fontSize: "1.2em" }}>Sí</Typography>
                        </Box>

                    </Grid>
                </Grid>
            }

        </GeneralModal>
    )
}

export default AddEditColaboradorModal