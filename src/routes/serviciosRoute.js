import { Router } from "express";
import {actualizarEstadoServicio, editarValoresPorServicio, eliminarServicios, getCambios, getMuestrasParaServicios, getPreciosSegunTipoServicio, getTipoServicioDeIDMuestra, getValoresDeVariablesPorIDServicio, getVariables, getVariablesUpdate, listarServicios, registrarCambio, registrarServicio, registroServicioTerminado} from '../controllers/serviciosController.js'
import { validarToken } from "../controllers/AutentificacionLogin.js";


const rutaServicios = Router();
rutaServicios.get('/listar', validarToken,listarServicios)
rutaServicios.post('/getvariables', validarToken, getVariables)
rutaServicios.post('/getvariablesupdate', validarToken, getVariablesUpdate)
rutaServicios.post('/gettiposervicio',validarToken,  getTipoServicioDeIDMuestra)
rutaServicios.post('/getserviciosconvariablesvalor',validarToken,  getValoresDeVariablesPorIDServicio)
rutaServicios.get('/getmuestrasser',validarToken,  getMuestrasParaServicios)
rutaServicios.post('/getprecio',validarToken,  getPreciosSegunTipoServicio)
rutaServicios.get('/getcambios', validarToken, getCambios)
rutaServicios.post('/registrarser', validarToken, registrarServicio)
rutaServicios.post('/registrarcambio',validarToken,  registrarCambio)
rutaServicios.post('/editarvaloresvariables', validarToken, editarValoresPorServicio)
rutaServicios.put('/servicioter/:id',validarToken,  registroServicioTerminado)
rutaServicios.put('/actualizarestadoservicio/:id', validarToken, actualizarEstadoServicio)
rutaServicios.delete('/eliminar/:id', validarToken, eliminarServicios)


export default rutaServicios;


