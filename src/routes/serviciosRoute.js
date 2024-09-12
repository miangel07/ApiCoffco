// import { Router } from "express";
// import { obtenerVariablesPorVersion,actualizarServicios, eliminarServicios, listarServicios, 
//     listarServiciosId, registrarServicio, obtenerServiciosAlquiler, registrarServicioAlquiler } from "../controllers/serviciosController.js";
// import { validarToken } from "../controllers/AutentificacionLogin.js";
// import { validateServicios } from "../../validation/serviciosValidation.js";

// const rutaServicios = Router();

// rutaServicios.get('/listar', listarServicios);
// rutaServicios.get('/listar/:id', validarToken, listarServiciosId);
// rutaServicios.post('/registrar', validarToken, validateServicios, registrarServicio);
// rutaServicios.put('/actualizar/:id', validarToken, validateServicios, actualizarServicios);
// rutaServicios.delete('/eliminar/:id', validarToken, eliminarServicios);
// rutaServicios.get('/listaAlquiler', obtenerServiciosAlquiler)
// rutaServicios.post('/variablesVersion',obtenerVariablesPorVersion)
// rutaServicios.post('/agregarAlquiler',registrarServicioAlquiler)


// export default rutaServicios;


import { Router } from "express";
import {actualizarEstadoServicio, eliminarServicios, getDocumento, getVariables, listarServicios, registrarServicio} from '../controllers/serviciosController.js'

const rutaServicios = Router();
rutaServicios.get('/listar',listarServicios)
rutaServicios.post('/getdocumento',getDocumento)
rutaServicios.post('/getvariables',getVariables)
rutaServicios.post('/registrarser',registrarServicio)
rutaServicios.put('/actualizarestadoservicio/:id',actualizarEstadoServicio)
rutaServicios.delete('/eliminar/:id',eliminarServicios)


export default rutaServicios;
