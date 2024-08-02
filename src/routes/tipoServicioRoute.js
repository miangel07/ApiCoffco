import { Router } from "express";
import { actualizartiposervicio, eliminartiposervicio, listartiposervicio, listartiposervicioId, registrartiposervicio } from "../controllers/tiposervicioControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateServicioDetalle } from "../../validation/servicioDetalleValidation.js";

const rutaidTipoServicio = Router();

rutaidTipoServicio.get('/listar', validarToken, listartiposervicio);
rutaidTipoServicio.get('/listar/:id', validarToken, listartiposervicioId);
rutaidTipoServicio.post('/registrar', validarToken, validateServicioDetalle, registrartiposervicio);
rutaidTipoServicio.put('/actualizar/:id', validarToken, validateServicioDetalle, actualizartiposervicio);
rutaidTipoServicio.delete('/eliminar/:id', validarToken, eliminartiposervicio);

export default rutaidTipoServicio;
