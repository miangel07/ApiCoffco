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
rutaAmbiente.get("/listarid/:id",validarToken,ListarAmbientesId);
rutaAmbiente.post("/registrar",validarToken,ambienteValidate,CrearAmbiente);
rutaAmbiente.put("/actualizar/:id",validarToken,ambienteValidate, ActualizarAmbiente);
rutaAmbiente.delete("/eliminar/:id",validarToken,EliminarAmbiente);

export default rutaAmbiente;
