import { Router } from "express";
import { actualizarestadoservicio, actualizartiposervicio, eliminartiposervicio, listartiposervicio, listartiposervicioId,listartiposervcioActivo, registrartiposervicio, ValidarServiciodeDocumento } from "../controllers/tiposervicioControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateTipoServicio } from "../../validation/tipoServicioValidation.js";


const rutaidTipoServicio = Router();

rutaidTipoServicio.get('/listar', listartiposervicio);
rutaidTipoServicio.get('/listar/:id', listartiposervicioId);
rutaidTipoServicio.get('/listarActivo/',listartiposervcioActivo );
rutaidTipoServicio.post('/registrar', validateTipoServicio, registrartiposervicio);
rutaidTipoServicio.post('/validarTiposervicio', ValidarServiciodeDocumento);
rutaidTipoServicio.put('/actualizar/:id', validateTipoServicio, actualizartiposervicio);
rutaidTipoServicio.put('/estado/:id', validateTipoServicio, actualizarestadoservicio);
rutaidTipoServicio.delete('/eliminar/:id', eliminartiposervicio);

export default rutaidTipoServicio;
