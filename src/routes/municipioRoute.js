import { Router } from "express";
import { listarMunicipio, registrarMunicipio, actualizarMunicipio, eliminarMunicipio, listarIdMunicipio } from "../controllers/municipoControllers.js";
import { validateMunicipio } from "../../validation/municipioValidation.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";

const rutaMunicipio = Router();

rutaMunicipio.get("/listar", validarToken, listarMunicipio);
rutaMunicipio.post("/registrar", validarToken, validateMunicipio, registrarMunicipio);
rutaMunicipio.put("/actualizar/:id", validarToken, validateMunicipio, actualizarMunicipio);
rutaMunicipio.delete("/eliminar/:id",validarToken,  eliminarMunicipio);
rutaMunicipio.get("/listarid/:id",validarToken, listarIdMunicipio);

export default rutaMunicipio;
