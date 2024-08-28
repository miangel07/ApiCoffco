import { Router } from "express";
import { actualizarvalor, eliminarvalor, listarvalor, listarvalorId, registrarvalor } from "../controllers/valorControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateValor } from "../../validation/valorValidation.js";
const rutaValor = Router()
rutaValor.get('/listar', validarToken, listarvalor)
rutaValor.get('/listarid/:id', validarToken, listarvalorId)
rutaValor.post('/registrar', validarToken, validateValor, registrarvalor)
rutaValor.put('/actualizar/:id', validarToken, validateValor, actualizarvalor)
rutaValor.delete('/eliminar/:id', validarToken, eliminarvalor)



export default rutaValor