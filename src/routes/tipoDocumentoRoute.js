import { Router } from "express";
import { actualizarEstadoTipoDocumento, listarTipoDocumento, registrarTipoDocumento, actualizarTipoDocumento, eliminarTipoDocumento, listarIdTipoDocumento, listarActivo } from "../controllers/tipoDocumentoController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateTipoDocumento } from "../../validation/tipoDocumentoValidation.js";

const rutaTipoDoc = Router();

rutaTipoDoc.get("/listar", validarToken, listarTipoDocumento);
rutaTipoDoc.get("/listaActivo", validarToken, listarActivo);
rutaTipoDoc.post("/registrar", validarToken, validateTipoDocumento, registrarTipoDocumento);
rutaTipoDoc.put("/actualizar/:id", validarToken, validateTipoDocumento, actualizarTipoDocumento);
rutaTipoDoc.put("/estado/:id", validarToken, actualizarEstadoTipoDocumento);
rutaTipoDoc.delete("/eliminar/:id", validarToken, eliminarTipoDocumento);
rutaTipoDoc.get("/listarid/:id", validarToken, listarIdTipoDocumento);

export default rutaTipoDoc;
