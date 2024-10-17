import { Router } from "express";
import {actualizarEstadoServicio, editarValoresPorServicio, eliminarServicios, getCambios, getMuestrasParaServicios, getPreciosSegunTipoServicio, getTipoServicioDeIDMuestra, getValoresDeVariablesPorIDServicio, getVariables, getVariablesUpdate, listarServicios, registrarCambio, registrarServicio, registroServicioTerminado} from '../controllers/serviciosController.js'

const rutaServicios = Router();
rutaServicios.get('/listar',listarServicios)
rutaServicios.post('/getvariables',getVariables)
rutaServicios.post('/getvariablesupdate',getVariablesUpdate)
rutaServicios.post('/gettiposervicio',getTipoServicioDeIDMuestra)
rutaServicios.post('/getserviciosconvariablesvalor',getValoresDeVariablesPorIDServicio)
rutaServicios.get('/getmuestrasser',getMuestrasParaServicios)
rutaServicios.post('/getprecio',getPreciosSegunTipoServicio)
rutaServicios.get('/getcambios',getCambios)
rutaServicios.post('/registrarser',registrarServicio)
rutaServicios.post('/registrarcambio',registrarCambio)
rutaServicios.post('/editarvaloresvariables',editarValoresPorServicio)
rutaServicios.put('/servicioter/:id',registroServicioTerminado)
rutaServicios.put('/actualizarestadoservicio/:id',actualizarEstadoServicio)
rutaServicios.delete('/eliminar/:id',eliminarServicios)


export default rutaServicios;


