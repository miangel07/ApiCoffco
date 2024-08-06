import { Router } from "express";
import {
  actualizarContraseña,
  recuperarContraseña,
} from "../controllers/recuperarContraseñaController.js";
const rutaRecuperarContraseña = Router();
rutaRecuperarContraseña.post("/recuperar", recuperarContraseña);
rutaRecuperarContraseña.put("/actualizar", actualizarContraseña);

export default rutaRecuperarContraseña;
