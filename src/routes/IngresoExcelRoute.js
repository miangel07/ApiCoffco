import { Router } from "express";
import { listaIngresoTrilla, obtenerInformacionServicio } from "../controllers/IngresosExcelController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";

const IngresosRouter = Router()

IngresosRouter.get('/trillaList',validarToken,listaIngresoTrilla)
IngresosRouter.post('/reporte',validarToken,obtenerInformacionServicio)



export default IngresosRouter