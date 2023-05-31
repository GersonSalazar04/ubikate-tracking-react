import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import ColaboradorTable from "../../Components/Colaborador/ColaboradorTable";
import ColaboradorFilter from "../../Components/Colaborador/ColaboradorFilter";
import { getColaborador } from '../../Actions/Colaborador/Colaborador-api';

export default function ColaboradorPage(){

    return (
        <>
        <Grid container styles={{color:'#044B6E'}} >
            <Grid item xs={12}>
                <ColaboradorFilter/>
            </Grid>
        </Grid>
        </>
    )
}