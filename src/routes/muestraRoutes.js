import { Router } from "express";
import { ListarMuestras, RegistrarMuestra, ActualizarMuestra, eliminarMuestra, ListaridMuestra, ActualizarEstadoMuestra, MuestrasTerminadas } from "../controllers/muestraControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateMuestra } from "../../validation/muestraValidation.js";
import { subirMuestras } from "../controllers/SubirMuestrasController.js";

const ruta = Router()

ruta.get("/listar", ListarMuestras)
ruta.get("/listarTerminadas", MuestrasTerminadas)
ruta.post("/registrar", subirMuestras, RegistrarMuestra)
ruta.put("/actualizar/:id", subirMuestras, ActualizarMuestra)
ruta.put("/estado/:id", ActualizarEstadoMuestra)
ruta.delete("/eliminar/:id_muestra", eliminarMuestra)
ruta.get("/listarid/:id", ListaridMuestra)

export default ruta

