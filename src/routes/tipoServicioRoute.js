import { Router } from "express";
import { actualizarestadoservicio, actualizartiposervicio, eliminartiposervicio,
     listartiposervicio, listartiposervicioId,listartiposervcioActivo, registrartiposervicio, 
     ValidarServiciodeDocumento, listarTiposServicioConDocumentoActivo } from "../controllers/tiposervicioControllers.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateTipoServicio } from "../../validation/tipoServicioValidation.js";


const rutaidTipoServicio = Router();

rutaidTipoServicio.get('/listar', validarToken,listartiposervicio);
rutaidTipoServicio.get('/listar/:id', validarToken,listartiposervicioId);
rutaidTipoServicio.get('/listarActivo/',validarToken,listartiposervcioActivo );
rutaidTipoServicio.post('/registrar',validarToken, validateTipoServicio, registrartiposervicio);
rutaidTipoServicio.post('/validarTiposervicio',validarToken, ValidarServiciodeDocumento);
rutaidTipoServicio.put('/actualizar/:id',validarToken, validateTipoServicio, actualizartiposervicio);
rutaidTipoServicio.put('/estado/:id',validarToken, validateTipoServicio, actualizarestadoservicio);
rutaidTipoServicio.delete('/eliminar/:id', validarToken,eliminartiposervicio);
rutaidTipoServicio.get('/listarTipoServActivos',validarToken, listarTiposServicioConDocumentoActivo);



export default rutaidTipoServicio;
