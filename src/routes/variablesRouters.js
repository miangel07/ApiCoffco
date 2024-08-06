import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateVariables } from "../../validation/variablesValidation.js";
import { ActualizarVariables, ELiminarVariables, ListarIdVariables, ListarVariables, RegistrarVariables } from "../controllers/variablesController.js";

const rutaVariables = Router()

rutaVariables.post("/registrar", validarToken, validateVariables, RegistrarVariables)
rutaVariables.get("/listar", validarToken, ListarVariables)
rutaVariables.get("/listarid/:id", validarToken, ListarIdVariables)
rutaVariables.put("/actualizar/:id", validarToken, ActualizarVariables)
rutaVariables.delete("/eliminar/:id", validarToken, ELiminarVariables)

export default rutaVariables


