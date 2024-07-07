import { Router } from "express";
import { ListarMuestras, RegistrarMuestra, ActualizarMuestra,EliminarMuestra,ListaridMuestra } from "../controllers/muestraControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateMuestra } from "../../validation/muestraValidation.js";
const ruta=Router()

ruta.get("/listar",validarToken,ListarMuestras)
ruta.post("/registrar",validarToken,validateMuestra,RegistrarMuestra)
ruta.put("/actualizar/:id",validarToken,validateMuestra,ActualizarMuestra)
ruta.delete("/eliminar/:id",validarToken,EliminarMuestra)
ruta.get("/listarid/:id",validarToken,ListaridMuestra)

export default ruta


