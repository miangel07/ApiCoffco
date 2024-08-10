import { Router } from "express";
import { actualizartiposervicio, eliminartiposervicio, listartiposervicio, listartiposervicioId, registrartiposervicio } from "../controllers/tiposervicioControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateTipoServicio } from "../../validation/tipoServicioValidation.js";


const rutaidTipoServicio = Router();

rutaidTipoServicio.get('/listar', validarToken, listartiposervicio);
rutaidTipoServicio.get('/listar/:id', validarToken, listartiposervicioId);
rutaidTipoServicio.post('/registrar', validarToken, validateTipoServicio, registrartiposervicio);
rutaidTipoServicio.put('/actualizar/:id', validarToken, validateTipoServicio, actualizartiposervicio);
rutaidTipoServicio.delete('/eliminar/:id', validarToken, eliminartiposervicio);

export default rutaidTipoServicio;
