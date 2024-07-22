import { Router } from "express";
import { ListaridVersiones, actualizarVersiones, eliminarVersiones, listarVersiones, registrarVersiones ,} from "../controllers/VersionesController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateVersiones } from "../../validation/versionesValidation.js";
import { subirArchivos } from "../controllers/SubirArchivosControllers.js";


const rutaVersion = Router()

rutaVersion.get('/listar',validarToken, listarVersiones)
rutaVersion.get('/listarid/:id_formato',validarToken, ListaridVersiones)
rutaVersion.post('/registrar',validarToken,subirArchivos,registrarVersiones)
rutaVersion.put('/actualizar/:id_formato',validarToken,subirArchivos,validateVersiones, actualizarVersiones)
rutaVersion.delete('/eliminar/:id_formato',validarToken, eliminarVersiones)


export default rutaVersion