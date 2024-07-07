import { Router } from "express";
import { actualizarServicios, eliminarServicios, listarServicios, listarServiciosId, registrarServicio } from "../controllers/serviciosController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateServicios } from "../../validation/serviciosValidation.js";


const rutaServicios = Router()

rutaServicios.get('/listar',validarToken,listarServicios)
rutaServicios.get('/listar/:id',validarToken,listarServiciosId)
rutaServicios.post('/registrar',validarToken,validateServicios,registrarServicio)
rutaServicios.put('/actualizar/:id',validarToken,validateServicios,actualizarServicios)
rutaServicios.delete('/eliminar/:id',validarToken,eliminarServicios)


export default rutaServicios
