import { Router } from "express";
import { actualizarDetalle, eliminarDetalle, listarDetalle, listarDetalleId, registrarDetalle } from "../controllers/detalleController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateDetalle } from "../../validation/detalleValidation.js";

const rutaDetalle = Router()

rutaDetalle.get('/listar',validarToken, listarDetalle )
rutaDetalle.get('/listar/:id',validarToken, listarDetalleId  )
rutaDetalle.post('/registrar',validarToken,validateDetalle, registrarDetalle)
rutaDetalle.put('/actualizar/:id',validarToken,validateDetalle, actualizarDetalle)
rutaDetalle.delete('/eliminar/:id',validarToken, eliminarDetalle)



export default rutaDetalle