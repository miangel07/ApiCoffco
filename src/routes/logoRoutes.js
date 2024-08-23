import { Router } from "express";
import { listarLogos, actualizarLogo, buscarLogo, eliminarLogo, registrarLogo } from "../controllers/logoController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { subirArchivos } from "../controllers/SubirArchivosControllers.js";
import { logoValidate } from "../../validation/logoValidation.js";



const logoRouter = Router()

logoRouter.get('/listar',  listarLogos)
logoRouter.post('/registrar',  subirArchivos, logoValidate, registrarLogo)
logoRouter.delete('/eliminar/:id', validarToken, eliminarLogo)
logoRouter.put('/actualizar/:id', validarToken, subirArchivos, logoValidate, actualizarLogo)
logoRouter.get('/listarid/:id', validarToken, buscarLogo)

export default logoRouter