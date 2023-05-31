import {get, post} from '../actions-types'

export function getColaborador(){
    return get('http://localhost:8080/api/colaborador/obtener');
}

export function addColaborador(data){
    post('http://localhost:8080/api/colaborador/agregar', data)
}

export function userlogin(data){
    post('http://localhost:8080/api/login', data)
}

export function getColaboradorById(id){
    return get(`http://localhost:8080/api/colaborador/obtener/${id}`)
}

export function updateColaborador(id, data){
    return post(`http://localhost:8080/api/colaborador/actualizar/${id}`, data)
}

export function updatePasswordColaborador(id, data){
    return post(`http://localhost:8080/api/colaborador/actualizar/password/${id}`, data)
}