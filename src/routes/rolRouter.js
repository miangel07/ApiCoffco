import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { listarRol, actualizarRol, buscarRolPorId, eliminarRol, registrarRol } from "../controllers/rolController.js";
import { rolValidate } from "../../validation/rolValidation.js";

const rolRouter = Router()
rutaFinca.get('/listar', validarToken, listarRol)
rutaFinca.post('/registrar', validarToken,rolValidate, registrarRol)
rutaFinca.delete('/eliminar/:id', validarToken, eliminarRol)
rutaFinca.put('/actualizar/:id', validarToken,rolValidate, actualizarRol)
rutaFinca.get('/listarid/:id', validarToken, buscarRolPorId)

export default rolRouter