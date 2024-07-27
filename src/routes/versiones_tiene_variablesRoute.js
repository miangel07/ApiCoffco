import { Router } from "express";
import {actualizarVersionesTieneVariables, eliminarVersionesTieneVariables, listarVersionesTieneVariables, listarVersionesTieneVariablesId, registrarVersionesTieneVariables} from '../controllers/versiones_tiene_variablesControllers.js'
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { versiones_tiene_variables_validate } from "../../validation/versiones_tiene_variablesValidator.js";




const rutaVersionesTieneVariables = Router()

rutaVersionesTieneVariables.post("/registrar",validarToken,versiones_tiene_variables_validate,registrarVersionesTieneVariables);
rutaVersionesTieneVariables.get("/listar",validarToken,listarVersionesTieneVariables);
rutaVersionesTieneVariables.get("/listar/:id",validarToken,listarVersionesTieneVariablesId);
rutaVersionesTieneVariables.put("/actualizar/:id",validarToken,versiones_tiene_variables_validate,actualizarVersionesTieneVariables);
rutaVersionesTieneVariables.delete("/eliminar/:id",validarToken,eliminarVersionesTieneVariables);

export default rutaVersionesTieneVariables