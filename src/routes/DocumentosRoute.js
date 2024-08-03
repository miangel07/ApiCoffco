import { Router } from "express";
import { listarDocumentos, registrarDocumentos, eliminarDocumentos, actalizardocumentos,buscarDocumentos,editarEstadoDocumento } from "../controllers/DocumentosController.js"
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { documentoValidate } from "../../validation/CargaDocsValidations.js";

const DocumentosRouter = Router()
DocumentosRouter.get('/listar',validarToken,listarDocumentos)
DocumentosRouter.post('/registrar',validarToken,documentoValidate,registrarDocumentos)
DocumentosRouter.delete('/eliminar/:id_documentos',validarToken, eliminarDocumentos)
DocumentosRouter.put('/actualizar/:id_documentos', validarToken,validateCargarDocs,actalizardocumentos)
DocumentosRouter.get('/buscar/:id', validarToken,validaciondocumentos,buscarDocumentos)


export default DocumentosRouter