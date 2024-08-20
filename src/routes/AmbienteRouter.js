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

rutaAmbiente.get("/listar",ListarAmbientes);
rutaAmbiente.get("/listarid/:id", ListarAmbientesId);
rutaAmbiente.post("/registrar", ambienteValidate,CrearAmbiente);
rutaAmbiente.put("/actualizar/:id", ambienteValidate, ActualizarAmbiente);
rutaAmbiente.delete("/eliminar/:id",  EliminarAmbiente);

export default rutaAmbiente;
