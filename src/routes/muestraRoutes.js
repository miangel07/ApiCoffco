import { Router } from "express";
import { ListarMuestras, RegistrarMuestra, ActualizarMuestra,eliminarMuestra,ListaridMuestra } from "../controllers/muestraControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateMuestra } from "../../validation/muestraValidation.js";
const ruta=Router()

ruta.get("/listar",ListarMuestras)
ruta.post("/registrar",validateMuestra,RegistrarMuestra)
ruta.put("/actualizar/:id",validateMuestra,ActualizarMuestra)
ruta.delete("/eliminar/:id_muestra",eliminarMuestra)
ruta.get("/listarid/:id",ListaridMuestra)

export default ruta


