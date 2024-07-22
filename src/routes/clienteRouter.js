import { Router } from "express";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import {
  actualizarCliente,
  eliminarCliente,
  lisatrCliente,
  listarClienteId,
  registrarCliente,
} from "../controllers/ClienteControllers.js";
const routerClientes = Router();

routerClientes.get("/listar", validarToken, lisatrCliente);
routerClientes.get("/listarid/:id", validarToken, listarClienteId);
routerClientes.post("/registrar", validarToken, registrarCliente);
routerClientes.put("/actualizar/:id", validarToken, actualizarCliente);
routerClientes.delete("/eliminar/:id", validarToken, eliminarCliente);

export default routerClientes;
