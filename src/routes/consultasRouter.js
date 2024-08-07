import express from "express";
import { validarUsuarios } from "../controllers/AutentificacionLogin.js";
import { consultaRegistroIngresoTostion, consultaSalidaserviciosTostionyTrilla } from "../controllers/consultasController.js";

const routerConsultas = express.Router();

routerConsultas.post('/reporteingreso',consultaRegistroIngresoTostion)
routerConsultas.post('/reportesalida',consultaSalidaserviciosTostionyTrilla)


export default routerConsultas;
