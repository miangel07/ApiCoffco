import { Router } from "express";
import { validarUsuarios } from "../controllers/AutentificacionLogin.js";
import { validationsLogin } from "../../validation/LoginValidations.js";
const RutaAuth = Router()

RutaAuth.post('/login',validationsLogin,validarUsuarios)




export default RutaAuth