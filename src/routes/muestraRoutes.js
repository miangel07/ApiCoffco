import { Router } from "express";
import { ListarMuestras, RegistrarMuestra, ActualizarMuestra,EliminarMuestra,ListaridMuestra } from "../controllers/muestraControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateMuestra } from "../../validation/muestraValidation.js";
const ruta=Router()

ruta.get("/listar",ListarMuestras)
ruta.post("/registrar",validateMuestra,RegistrarMuestra)
ruta.put("/actualizar/:id",validateMuestra,ActualizarMuestra)
ruta.delete("/eliminar/:id",EliminarMuestra)
ruta.get("/listarid/:id",ListaridMuestra)

export default ruta


