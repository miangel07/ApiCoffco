import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import {
  ListarAmbientes,
  ListarAmbientesId,
  ActualizarAmbiente,
  CrearAmbiente,
  EliminarAmbiente,
} from "../controllers/AmbienteController.js";
import { ambienteValidate } from "../../validation/ambienteValidation.js";

const rutaAmbiente = Router();

rutaAmbiente.get("/listar",validarToken,ListarAmbientes);
rutaAmbiente.get("/listarid/:id", validarToken,ListarAmbientesId);
rutaAmbiente.post("/registrar", ambienteValidate,validarToken,CrearAmbiente);
rutaAmbiente.put("/actualizar/:id", ambienteValidate,validarToken, ActualizarAmbiente);
rutaAmbiente.delete("/eliminar/:id", validarToken, EliminarAmbiente);

export default rutaAmbiente;
