import { Router } from "express";
import { actualizarServicioDetalle, eliminarServicioDetalle, listarServiciosDetalle, listarServicioDetallePorId, registrarServicioDetalle } from "../controllers/servicioDetalleController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateServicioDetalle } from "../../validation/servicioDetalleValidation.js";

const rutaServicioDetalle = Router();

rutaServicioDetalle.get('/listar',validarToken, listarServiciosDetalle);
rutaServicioDetalle.get('/listar/:id',validarToken,listarServicioDetallePorId);
rutaServicioDetalle.post('/registrar', validarToken, validateServicioDetalle, registrarServicioDetalle);
rutaServicioDetalle.put('/actualizar/:id', validarToken, validateServicioDetalle, actualizarServicioDetalle);
rutaServicioDetalle.delete('/eliminar/:id', validarToken, eliminarServicioDetalle);

export default rutaServicioDetalle;
