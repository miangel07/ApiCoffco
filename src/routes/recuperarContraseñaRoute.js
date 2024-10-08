import { Router } from "express";
import {
  recuperarContraseña,
  validarRecuperacion,
  actualizarContraseña
} from "../controllers/recuperarContraseñaController.js";
const rutaRecuperarContraseña = Router();
rutaRecuperarContraseña.post("/recuperar", recuperarContraseña);
rutaRecuperarContraseña.post("/validar", validarRecuperacion);
rutaRecuperarContraseña.post("/cambiar", actualizarContraseña);
/* rutaRecuperarContraseña.put("/actualizar", actualizarContraseña); */

export default rutaRecuperarContraseña;
