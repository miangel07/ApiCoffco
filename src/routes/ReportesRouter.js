import { Router } from "express";

import {Reportes} from "../controllers/ReportesController.js"
const ReportesRouter = Router()

ReportesRouter.post('/generar',Reportes)


export default ReportesRouter