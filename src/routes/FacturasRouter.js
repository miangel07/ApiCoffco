import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";

import { generarFacturas } from "../controllers/FacturasControllers.js";
const FacturasRouter = Router()


FacturasRouter.post('/generar',  generarFacturas)


export default FacturasRouter