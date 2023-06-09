import React from 'react';
import { Grid, Paper } from "@mui/material";
import MarcasTable from '../../Components/Marca/MarcasTable';

export default function MapaPage() {

    return (
        <>
            <Grid container >
                <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: "10px", paddingLeft:"10px", paddingBottom:"10px" }}>
                    <Grid item xs={12}>
                        <MarcasTable />
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}