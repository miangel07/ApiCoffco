import { Router } from "express";

import { Reportes } from "../controllers/ReportesController.js"
import { validarToken } from "../controllers/AutentificacionLogin.js";
const ReportesRouter = Router()

ReportesRouter.post('/generar', validarToken, Reportes)


export default ReportesRouter