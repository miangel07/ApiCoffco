import express from "express";
import { validarUsuarios } from "../controllers/AutentificacionLogin.js";

const routerConsultas = express.Router();

routerConsultas.use(validarUsuarios);

export default routerConsultas;
