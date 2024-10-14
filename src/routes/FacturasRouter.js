import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";

import { generarFacturas, facturasAlquiler } from "../controllers/FacturasControllers.js";
const FacturasRouter = Router()


FacturasRouter.post('/generar', validarToken, generarFacturas)
FacturasRouter.post('/alquiler',  facturasAlquiler)


export default FacturasRouter