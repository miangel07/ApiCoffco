import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateVariables } from "../../validation/variablesValidation.js";
import { ActualizarVariables, ELiminarVariables, ListarIdVariables, ListarVariables, RegistrarVariables, UpdateEstado } from "../controllers/variablesController.js";

const rutaVariables = Router()

rutaVariables.post("/registrar", validarToken, validateVariables, RegistrarVariables)
rutaVariables.get("/listar", ListarVariables)
rutaVariables.get("/listarid/:id", ListarIdVariables)
rutaVariables.put("/actualizar/:id", validarToken, validateVariables, ActualizarVariables)
rutaVariables.put("/estado/:id", UpdateEstado)
rutaVariables.delete("/eliminar/:id", ELiminarVariables)


export default rutaVariables


