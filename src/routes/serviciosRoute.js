import { Router } from "express";
import {actualizarEstadoServicio, eliminarServicios, getVariables, listarServicios, registrarServicio} from '../controllers/serviciosController.js'
import { validarToken } from "../controllers/AutentificacionLogin.js";

const rutaServicios = Router();
rutaServicios.get('/listar',validarToken,listarServicios)
rutaServicios.post('/getvariables',validarToken,getVariables)
rutaServicios.post('/registrarser',registrarServicio)
rutaServicios.put('/actualizarestadoservicio/:id',validarToken,actualizarEstadoServicio)
rutaServicios.delete('/eliminar/:id',validarToken,eliminarServicios)


export default rutaServicios;
