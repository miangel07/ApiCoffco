import { Router } from "express";
import { actualizarvalor, eliminarvalor, listarvalor, listarvalorId, registrarvalor } from "../controllers/valorControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateDetalle } from "../../validation/detalleValidation.js";

const rutaValor = Router()

rutaValor.get('/listar', validarToken, listarvalor)
rutaValor.get('/listar/:id', validarToken, listarvalorId)
rutaValor.post('/registrar', validarToken, validateDetalle, registrarvalor)
rutaValor.put('/actualizar/:id', validarToken, validateDetalle, actualizarvalor)
rutaValor.delete('/eliminar/:id', validarToken, eliminarvalor)



export default rutaValor