import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { listarRol, actualizarRol, buscarRolPorId, eliminarRol, registrarRol } from "../controllers/rolController.js";

import { rolValidate } from "../../validation/rolValidation.js";

const rolRouter = Router()
rolRouter.get('/listar', validarToken, listarRol)
rolRouter.post('/registrar', validarToken, rolValidate, registrarRol)
rolRouter.delete('/eliminar/:id', validarToken, eliminarRol)
rolRouter.put('/actualizar/:id', validarToken, rolValidate, actualizarRol)
rolRouter.get('/listarid/:id', validarToken, buscarRolPorId)

export default rolRouter