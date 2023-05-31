import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import './../../Styles/Colaboradores.scss'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';


export default function ColaboradorTable({colaboradores}) {
  const columns = [
    { field: 'codigoUsuario', headerName: 'Cod.Empleado', width: 130 },
    { field: 'tipoDocumento', headerName: 'Tipo Doc.Identidad', width: 130 },
    { field: 'numeroDocumentoIdentidad', headerName: 'Num Doc.Identidad', width: 140 },
    { field: 'apellidoPaterno', headerName: 'Apellido Paterno', width: 130 },
    { field: 'apellidoMaterno', headerName: 'Apellido Materno', width: 130 },
    { field: 'nombres', headerName: 'Nombres', width: 130 },
    { field: 'correo', headerName: 'Correo', width: 150 },
    { field: 'numeroTelefono', headerName: 'Teléfono Persona', width: 130 },
    { field: 'situacionRegistro', headerName: 'Estado', width: 130 },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleIconEdit(params, event)}>
          <EditIcon sx={{fontSize:'medium'}}/>
        </IconButton>
      )},
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
    const field = event.target.dataset.field
    if (field === 'actions') {
      return
    }
    const id = params.row.codigoUsuario;
    navigate(`/colaborador/${id}`);
  };

  const handleIconEdit = (params, event) => {
    event.stopPropagation(); 
    const id = params.row.codigoUsuario;
    navigate(`/colaborador/${id}/edit`);
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className="custom-table"
        rows={colaboradores && colaboradores.resultados || []}
        columns={columns}
        pageSize={5}
        onRowClick={(params, event) => handleRowClick(params, event)}
        getRowId={(row) => row.codigoUsuario}
      />
    </div>
  );
}