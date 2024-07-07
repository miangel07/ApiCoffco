import { Router } from "express";
import { listarAlquiler, registrarAlquiler, actualizarAlquiler, eliminarAlquiler } from "../controllers/AlquilerController.js";
import {  validateAlquilerLaboratorio, validateEstadoAlquiler} from "../../validation/AlquilerValidation.js";
import { validarToken} from "../controllers/AutentificacionLogin.js";
const rutaAlquiler= Router()

rutaAlquiler.get('/listarAlqui', validarToken,listarAlquiler)
rutaAlquiler.post('/registrarAlqui',validarToken,validateAlquilerLaboratorio,registrarAlquiler)
rutaAlquiler.delete('/eliminarAlqui/:id_alquiler', validarToken, eliminarAlquiler)
rutaAlquiler.put('/actualizarAlqui/:id_alquiler',validarToken,validateEstadoAlquiler,actualizarAlquiler)



export default rutaAlquiler  