import { Router } from "express";
import { listarDocumentos, registrarDocumentos, eliminarDocumentos, actalizardocumentosVersion, buscarDocumentos, Actualizar } from "../controllers/DocumentosController.js"
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateCargarDocs, validaciondocumentos } from "../../validation/CargaDocsValidations.js";

const DocumentosRouter = Router()
DocumentosRouter.get('/listar', listarDocumentos)
DocumentosRouter.post('/registrar', registrarDocumentos)
DocumentosRouter.delete('/eliminar/:id_documentos', validarToken, eliminarDocumentos)
DocumentosRouter.put('/actualizarversion/:id_documentos', validaciondocumentos, actalizardocumentosVersion)
DocumentosRouter.put('/actualizar/:id_documentos', validaciondocumentos, Actualizar)
DocumentosRouter.get('/buscar/:id', validarToken, validaciondocumentos, buscarDocumentos)


export default DocumentosRouter