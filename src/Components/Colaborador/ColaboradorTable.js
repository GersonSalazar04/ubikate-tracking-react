import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import './../../Styles/Colaboradores.scss'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddEditColaboradorModal from './AddEditColaboradorModal';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


export default function ColaboradorTable({colaboradores, loading}) {
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState("")
  const [action, setAction] = useState("view")

  const columns = [
    { field: 'codigoUsuario', headerName: 'Cod. Empleado', flex: 1 },
    { field: 'tipoDocumento', headerName: 'Tipo Doc. Identidad' },
    { field: 'numeroDocumentoIdentidad', headerName: 'Num Doc. Identidad', flex: 1 },
    { field: 'apellidoPaterno', headerName: 'Apellido Paterno', flex: 1 },
    { field: 'apellidoMaterno', headerName: 'Apellido Materno', flex: 1 },
    { field: 'nombres', headerName: 'Nombres', flex: 1 },
    { field: 'correo', headerName: 'Correo', flex: 1 },
    { field: 'numeroTelefono', headerName: 'Teléfono Persona', flex: 1 },
    { field: 'situacionRegistro', headerName: 'Estado', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleIconEdit(params, event)}>
          <EditIcon sx={{ fontSize: 'medium', color: "text.primary" }} />
        </IconButton>
      ),
      
    }
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (params, event) => {
    setAction("view")
    const field = event.target.dataset.field
    if (field === 'actions') {
      return
    }
    const id = params.row.codigoUsuario;
    setOpen(true)
    setSelectedId(id);
  };

  const handleIconEdit = (params, event) => {
    event.stopPropagation(); 
    setAction("edit")
    const id = params.row.codigoUsuario;
    setOpen(true)
    setSelectedId(id);
  }

  const handleAddEditColaboradorClose = () => {
    setOpen(false)
  }

  return (
    <div style={{ height: '27em', width: '100%' }}>
      <DataGrid
        style={{ border: 'none' }}
        rows={colaboradores && colaboradores.resultados || []}
        columns={columns}
        onRowClick={(params, event) => handleRowClick(params, event)}
        getRowId={(row) => row.codigoUsuario}
        autoPageSize
        loading= {loading}
      />
      <AddEditColaboradorModal 
        open={open}
        id={selectedId}
        action={action}
        handleClose={handleAddEditColaboradorClose} 
        actionButtonName={"Editar"} 
        secondActionName={"Eliminar"}
        secondActionFunction={handleAddEditColaboradorClose}
        icon={<PersonOutlineOutlinedIcon color="secondary"/>}
        title={action === 'view' ? "Detalles del colaborador": "Editar colaborador"}
        />
    </div>
  );
}