import { Router } from "express";
import {actualizarEstadoServicio, eliminarServicios, getPreciosSegunTipoServicio, getVariables, getVariablesUpdate, listarServicios, registrarServicio, registroServicioTerminado} from '../controllers/serviciosController.js'

const rutaServicios = Router();
rutaServicios.get('/listar',listarServicios)
rutaServicios.post('/getvariables',getVariables)
rutaServicios.post('/getvariablesupdate',getVariablesUpdate)
rutaServicios.post('/getprecio',getPreciosSegunTipoServicio)
rutaServicios.post('/registrarser',registrarServicio)
rutaServicios.put('/servicioter/:id',registroServicioTerminado)
rutaServicios.put('/actualizarestadoservicio/:id',actualizarEstadoServicio)
rutaServicios.delete('/eliminar/:id',eliminarServicios)


export default rutaServicios;