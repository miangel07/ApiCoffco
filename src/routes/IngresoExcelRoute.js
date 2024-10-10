import { Router } from "express";
import { listaIngresoTrilla } from "../controllers/IngresosExcelController.js";


const IngresosRouter = Router()

IngresosRouter.get('/trillaList',listaIngresoTrilla)



export default IngresosRouter