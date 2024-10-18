import { Router } from "express";
import { listarLogos, actualizarLogo, buscarLogo, eliminarLogo, registrarLogo, estadoLogo, logosActivos } from "../controllers/logoController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { subirLogos } from "../controllers/SubirLogosController.js";
import { logoValidate } from "../../validation/logoValidation.js";

const logoRouter = Router()

logoRouter.get('/listar', validarToken, listarLogos)
logoRouter.get('/listaActivos', validarToken, logosActivos)
logoRouter.post('/registrar', validarToken, subirLogos, logoValidate, registrarLogo)
logoRouter.delete('/eliminar/:id', validarToken, eliminarLogo)
logoRouter.put('/actualizar/:id', validarToken, subirLogos, actualizarLogo)
logoRouter.put('/estado/:id', validarToken, estadoLogo)
logoRouter.get('/listarid/:id', validarToken, buscarLogo)

export default logoRouter