import { Router } from "express";
import { actualizarEstadoTipoDocumento, listarTipoDocumento, registrarTipoDocumento, actualizarTipoDocumento, eliminarTipoDocumento, listarIdTipoDocumento } from "../controllers/tipoDocumentoController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateTipoDocumento } from "../../validation/tipoDocumentoValidation.js";

const rutaTipoDoc = Router();

rutaTipoDoc.get("/listar",  listarTipoDocumento);
rutaTipoDoc.post("/registrar", validateTipoDocumento, registrarTipoDocumento);
rutaTipoDoc.put("/actualizar/:id", validateTipoDocumento, actualizarTipoDocumento);
rutaTipoDoc.put("/estado/:id", actualizarEstadoTipoDocumento);
rutaTipoDoc.delete("/eliminar/:id", eliminarTipoDocumento);
rutaTipoDoc.get("/listarid/:id", listarIdTipoDocumento);

export default rutaTipoDoc;
