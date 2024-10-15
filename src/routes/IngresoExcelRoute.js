import { Router } from "express";
import { listaIngresoTrilla, obtenerInformacionServicio } from "../controllers/IngresosExcelController.js";


const IngresosRouter = Router()

IngresosRouter.get('/trillaList',listaIngresoTrilla)
IngresosRouter.post('/reporte',obtenerInformacionServicio)



export default IngresosRouter