import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateVariables } from "../../validation/variablesValidation.js";
import { ActualizarVariables, ELiminarVariables, ListarIdVariables, ListarVariables, RegistrarVariables ,UpdateEstado} from "../controllers/variablesController.js";

const rutaVariables = Router()

rutaVariables.post("/registrar",  validateVariables, RegistrarVariables)
rutaVariables.get("/listar",  ListarVariables)
rutaVariables.get("/listarid/:id", validarToken, ListarIdVariables)
rutaVariables.put("/actualizar/:id",  validateVariables, ActualizarVariables)
rutaVariables.put("/estado/:id",   UpdateEstado)
rutaVariables.delete("/eliminar/:id", validarToken, ELiminarVariables)


export default rutaVariables


