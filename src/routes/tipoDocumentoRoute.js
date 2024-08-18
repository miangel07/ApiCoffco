import { Router } from "express";
import { listarTipoDocumento, registrarTipoDocumento, actualizarTipoDocumento, eliminarTipoDocumento, listarIdTipoDocumento } from "../controllers/tipoDocumentoController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateTipoDocumento } from "../../validation/tipoDocumentoValidation.js";

const rutaTipoDoc = Router();

rutaTipoDoc.get("/listar",  listarTipoDocumento);
rutaTipoDoc.post("/registrar", validarToken, validateTipoDocumento, registrarTipoDocumento);
rutaTipoDoc.put("/actualizar/:id", validarToken, validateTipoDocumento, actualizarTipoDocumento);
rutaTipoDoc.delete("/eliminar/:id", validarToken, eliminarTipoDocumento);
rutaTipoDoc.get("/listarid/:id", validarToken, listarIdTipoDocumento);

export default rutaTipoDoc;
