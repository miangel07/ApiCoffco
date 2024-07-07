import { Estadistica } from "../controllers/EstadisticaControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";

import Router  from "express";
const EstadisticaRouter=Router()

EstadisticaRouter.get('/estadistica',validarToken, Estadistica)
export default EstadisticaRouter