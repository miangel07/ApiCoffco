import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateVariables } from "../../validation/variablesValidation.js";
import { ActualizarVariables, ELiminarVariables, ListarIdVariables, ListarVariables, RegistrarVariables, UpdateEstado ,valiribaleActivas} from "../controllers/variablesController.js";

const rutaVariables = Router()

rutaVariables.post("/registrar", validarToken, validateVariables, RegistrarVariables)
rutaVariables.get("/listar", validarToken,ListarVariables)
rutaVariables.get("/listaActivas",validarToken, valiribaleActivas)
rutaVariables.get("/listarid/:id", validarToken ,ListarIdVariables)
rutaVariables.put("/actualizar/:id", validarToken, validateVariables, ActualizarVariables)
rutaVariables.put("/estado/:id", validarToken,UpdateEstado)
rutaVariables.delete("/eliminar/:id",validarToken, ELiminarVariables)


export default rutaVariables


