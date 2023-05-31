import {get, post} from '../actions-types';

export function obtenerMarcas(data) {
    return post('http://localhost:8080/api/marca/obtener', data);
};