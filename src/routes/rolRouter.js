import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { listarRol, actualizarRol, buscarRolPorId, eliminarRol, registrarRol } from "../controllers/rolController.js";

import { rolValidate } from "../../validation/rolValidation.js";

const rolRouter = Router()
rolRouter.get('/listar',validarToken, listarRol)
rolRouter.post('/registrar', validarToken, rolValidate, registrarRol)
rolRouter.delete('/eliminar/:idRol',validarToken,  eliminarRol)
rolRouter.put('/actualizar/:idRol', validarToken, rolValidate, actualizarRol)
rolRouter.get('/listarid/:idRol', validarToken, buscarRolPorId)

export default rolRouter