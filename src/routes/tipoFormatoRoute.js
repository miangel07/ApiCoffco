import { Router } from "express";
import { actualizarTipoFormato, eliminarTipoFormato, listarTipoFormato, listarTipoFormatoId, registrarTipoFormato } from "../controllers/tipoFormatoController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateTipoFormato } from "../../validation/tipoFormatoValidation.js";


const rutaTipoFormato = Router()

rutaTipoFormato.get('/listar',validarToken,listarTipoFormato)
rutaTipoFormato.get('/listar/:id',validarToken,listarTipoFormatoId)
rutaTipoFormato.post('/registrar',validarToken,validateTipoFormato,registrarTipoFormato)
rutaTipoFormato.put('/actualizar/:id',validarToken,validateTipoFormato,actualizarTipoFormato)
rutaTipoFormato.delete('/eliminar/:id',validarToken,eliminarTipoFormato)

export default rutaTipoFormato
