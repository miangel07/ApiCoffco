<<<<<<< HEAD
import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { listarRol, actualizarRol, buscarRolPorId, eliminarRol, registrarRol } from "../controllers/rolController.js";

import { rolValidate } from "../../validation/rolValidation.js";

const rolRouter = Router()
rolRouter.get('/listar', listarRol)
rolRouter.post('/registrar', validarToken, rolValidate, registrarRol)
rolRouter.delete('/eliminar/:idRol',validarToken,  eliminarRol)
rolRouter.put('/actualizar/:idRol', validarToken, rolValidate, actualizarRol)
rolRouter.get('/listarid/:idRol', validarToken, buscarRolPorId)

=======
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

>>>>>>> 60b19c509f6d3b695fbf98cc9c372aedd6e8e5ab
export default rolRouter