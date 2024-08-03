import { Router } from "express";
import { ListaridVersiones, actualizarVersiones, eliminarVersiones, listarVersiones, registrarVersiones, desactivarEstado, actualizar } from "../controllers/VersionesController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateVersiones } from "../../validation/versionesValidation.js";
import { subirArchivos } from "../controllers/SubirArchivosControllers.js";


const rutaVersion = Router()

rutaVersion.get('/listar', listarVersiones)
rutaVersion.get('/listarid/:id_formato', ListaridVersiones)
rutaVersion.post('/registrar', subirArchivos, validateVersiones, registrarVersiones)
rutaVersion.put('/actualizarVersion/:id_formato', subirArchivos, validateVersiones, actualizarVersiones)
rutaVersion.put('/actualizarEstado/:id_formato', desactivarEstado)
rutaVersion.put('/actualizar/:id_formato', subirArchivos, actualizar)
rutaVersion.delete('/eliminar/:id_formato', validarToken, eliminarVersiones)


export default rutaVersion