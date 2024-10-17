import { Router } from "express";
import { ListarMuestras, RegistrarMuestra, ActualizarMuestra, eliminarMuestra, ListaridMuestra, ActualizarEstadoMuestra, MuestrasTerminadas } from "../controllers/muestraControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateMuestra } from "../../validation/muestraValidation.js";
import { subirMuestras } from "../controllers/SubirMuestrasController.js";

const ruta = Router()

ruta.get("/listar", validarToken, ListarMuestras)
ruta.get("/listarTerminadas", validarToken, MuestrasTerminadas)
ruta.post("/registrar", validarToken, subirMuestras, RegistrarMuestra)
ruta.put("/actualizar/:id",validarToken,  subirMuestras, ActualizarMuestra)
ruta.put("/estado/:id",validarToken,  ActualizarEstadoMuestra)
ruta.delete("/eliminar/:id_muestra", validarToken, eliminarMuestra)
ruta.get("/listarid/:id", validarToken, ListaridMuestra)

export default ruta

