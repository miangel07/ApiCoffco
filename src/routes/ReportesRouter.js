import { Router } from "express";

import {Reportes} from "../controllers/ReportesController.js"
const ReportesRouter = Router()

ReportesRouter.get('/listar',Reportes)


export default ReportesRouter