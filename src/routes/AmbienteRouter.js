import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import {
  ListarAmbientes,
  ListarAmbientesId,
  ActualizarAmbiente,
  CrearAmbiente,
  EliminarAmbiente,
} from "../controllers/AmbienteController.js";

const rutaAmbiente = Router();

rutaAmbiente.get("/listar", validarToken, ListarAmbientes);
rutaAmbiente.get("/listarid/:id", validarToken, ListarAmbientesId);
rutaAmbiente.post("/registrar", validarToken, CrearAmbiente);
rutaAmbiente.put("/actualizar/:id", validarToken, ActualizarAmbiente);
rutaAmbiente.delete("/eliminar/:id", validarToken, EliminarAmbiente);

export default rutaAmbiente;
