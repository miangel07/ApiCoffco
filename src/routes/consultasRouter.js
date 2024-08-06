import express from "express";
import { validarUsuarios } from "../controllers/AutentificacionLogin.js";
import { consultaRegistroIngresoTostion } from "../controllers/consultasController.js";

const routerConsultas = express.Router();

routerConsultas.post('/reporteingresotrilla',consultaRegistroIngresoTostion)


export default routerConsultas;
