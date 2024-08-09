import express from "express";
import { consultaRegistroIngresoTostion, consultaSalidaserviciosTostionyTrilla } from "../controllers/consultasController.js";
import { validateConsultas } from "../../validation/consultasValidate.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";

const routerConsultas = express.Router();

routerConsultas.post('/reporteingreso',validarToken,validateConsultas,consultaRegistroIngresoTostion)
routerConsultas.post('/reportesalida',validarToken,validateConsultas,consultaSalidaserviciosTostionyTrilla)


export default routerConsultas;
