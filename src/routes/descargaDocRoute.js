import  { Router } from 'express';
import { DescargarDocumento } from '../controllers/descargaDoc.js';

const routerDescarga = Router()

routerDescarga.get('/descarga/:documentoId', DescargarDocumento)

export default routerDescarga
