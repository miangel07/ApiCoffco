import { Router } from "express";

import { ListarDatos, RegistrarDatos, ActualizarDatos, ELiminarDatos, ListarIdDatos } from "../controllers/DatosController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateDatos } from "../../validation/datosValidation.js";
const rutaDatos=Router()

rutaDatos.get("/listar",validarToken,ListarDatos)
rutaDatos.post("/registrar",validarToken,validateDatos,RegistrarDatos)
rutaDatos.put("/actualizar/:id",validarToken,validateDatos,ActualizarDatos)
rutaDatos.delete("/eliminar/:id",validarToken,ELiminarDatos)
rutaDatos.get("/listarid/:id",validarToken,ListarIdDatos)

export default rutaDatos


