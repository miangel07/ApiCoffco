import { Router } from "express";
import { listarDocumentos, registrarDocumentos, eliminarDocumentos, consultaGrafica, actalizardocumentosVersion, buscarDocumentos, Actualizar } from "../controllers/DocumentosController.js"
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { documentoValidate } from "../../validation/CargaDocsValidations.js";
import { subirArchivos } from "../controllers/SubirArchivosControllers.js";

const DocumentosRouter = Router()

DocumentosRouter.get('/listar', validarToken, listarDocumentos)
DocumentosRouter.post('/registrar', validarToken,  subirArchivos, registrarDocumentos)
DocumentosRouter.delete('/eliminar/:id_documentos', validarToken, eliminarDocumentos)
DocumentosRouter.post('/actualizarversion', subirArchivos,  actalizardocumentosVersion)
DocumentosRouter.put('/actualizar/:id_documentos', validarToken, subirArchivos,  Actualizar)
DocumentosRouter.get('/buscar/:id', validarToken, buscarDocumentos)
DocumentosRouter.get('/grafica', validarToken, consultaGrafica)



export default DocumentosRouter