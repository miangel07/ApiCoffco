import { Router } from "express";
import { listarLogos, actualizarLogoVersion, actualizarEstado, buscarLogo, eliminarLogo, registrarLogo } from "../controllers/logoController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { subirArchivos } from "../controllers/SubirArchivosControllers.js";
import { logoValidate } from "../../validation/logoValidation.js";



const logoRouter = Router()

logoRouter.get('/listar', validarToken, listarLogos)
logoRouter.post('/registrar', validarToken, subirArchivos, logoValidate, registrarLogo)
logoRouter.delete('/eliminar/:id', validarToken, eliminarLogo)
logoRouter.put('/actualizarVersion/:id', validarToken, subirArchivos, logoValidate, actualizarLogoVersion)
logoRouter.put('/actualizar/:id', validarToken, subirArchivos, logoValidate, actualizarEstado)
logoRouter.get('/listarid/:id', buscarLogo)

export default logoRouter