import { Router } from "express";
import { listarDocumentos, registrarDocumentos, eliminarDocumentos, consultaGrafica, actalizardocumentosVersion, buscarDocumentos, Actualizar } from "../controllers/DocumentosController.js"
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { documentoValidate } from "../../validation/CargaDocsValidations.js";
import { subirArchivos } from "../controllers/SubirArchivosControllers.js";

const DocumentosRouter = Router()

DocumentosRouter.get('/listar', listarDocumentos)
DocumentosRouter.post('/registrar', subirArchivos, registrarDocumentos)
DocumentosRouter.delete('/eliminar/:id_documentos', validarToken, eliminarDocumentos)
DocumentosRouter.post('/actualizarversion', subirArchivos, documentoValidate, actalizardocumentosVersion)
DocumentosRouter.put('/actualizar/:id_documentos', subirArchivos, documentoValidate, Actualizar)
DocumentosRouter.get('/buscar/:id', buscarDocumentos)
DocumentosRouter.get('/grafica', consultaGrafica)



export default DocumentosRouter