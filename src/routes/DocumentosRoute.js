import { Router } from "express";
import { listarDocumentos, registrarDocumentos, eliminarDocumentos, actalizardocumentosVersion, buscarDocumentos, Actualizar } from "../controllers/DocumentosController.js"
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { documentoValidate } from "../../validation/CargaDocsValidations.js";

const DocumentosRouter = Router()

DocumentosRouter.get('/listar',validarToken, listarDocumentos)
DocumentosRouter.post('/registrar',validarToken, registrarDocumentos)
DocumentosRouter.delete('/eliminar/:id_documentos', validarToken, eliminarDocumentos)
DocumentosRouter.put('/actualizarversion/:id_documentos', validarToken, documentoValidate, actalizardocumentosVersion)
DocumentosRouter.put('/actualizar/:id_documentos', validarToken, documentoValidate, Actualizar)
DocumentosRouter.get('/buscar/:id',  buscarDocumentos)



export default DocumentosRouter