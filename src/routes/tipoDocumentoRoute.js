import { Router } from "express";
import { listarTipoDocumento, registrarTipoDocumento, actualizarTipoDocumento, eliminarTipoDocumento, listarIdTipoDocumento } from "../controllers/tipoDocumentoControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateTipoDocumento } from "../../validation/tipoDocumentoValidation.js";

const rutaTipoDoc = Router();

ruta.get("/listar", validarToken, listarTipoDocumento);
ruta.post("/registrar", validarToken, validateTipoDocumento, registrarTipoDocumento);
ruta.put("/actualizar/:id", validarToken, validateTipoDocumento, actualizarTipoDocumento);
ruta.delete("/eliminar/:id", validarToken, eliminarTipoDocumento);
ruta.get("/listarid/:id", validarToken, listarIdTipoDocumento);

export default rutaTipoDoc;
