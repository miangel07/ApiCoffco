import { Router } from "express";
import { listarMunicipio, registrarMunicipio, actualizarMunicipio, eliminarMunicipio, listarIdMunicipio } from "../controllers/municipoControllers.js";
import { validateMunicipio } from "../../validation/municipioValidation.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";

const rutaMunicipio = Router();

rutaMunicipio.get("/listar", listarMunicipio);
rutaMunicipio.post("/registrar", validateMunicipio, registrarMunicipio);
rutaMunicipio.put("/actualizar/:id", validateMunicipio, actualizarMunicipio);
rutaMunicipio.delete("/eliminar/:id", eliminarMunicipio);
rutaMunicipio.get("/listarid/:id", listarIdMunicipio);

export default rutaMunicipio;
