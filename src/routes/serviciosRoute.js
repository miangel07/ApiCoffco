import { Router } from "express";
import {actualizarEstadoServicio, eliminarServicios, getVariables, getVariablesUpdate, listarServicios, registrarServicio} from '../controllers/serviciosController.js'

const rutaServicios = Router();
rutaServicios.get('/listar',listarServicios)
rutaServicios.post('/getvariables',getVariables)
rutaServicios.post('/getvariablesupdate',getVariablesUpdate)
rutaServicios.post('/registrarser',registrarServicio)
rutaServicios.put('/actualizarestadoservicio/:id',actualizarEstadoServicio)
rutaServicios.delete('/eliminar/:id',eliminarServicios)


export default rutaServicios;