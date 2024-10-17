import { Router } from "express";
import { actualizarAlquiler, eliminarAlquiler, getAlquiler, registrarAlquiler, usuariosParaAlquiler } from "../controllers/AlquilerController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";

const rutaAlquiler = Router()

rutaAlquiler.get('/listar', validarToken, getAlquiler)
rutaAlquiler.get('/listarus',validarToken, usuariosParaAlquiler)
rutaAlquiler.post('/registrar',validarToken, registrarAlquiler)
rutaAlquiler.put('/actualizar/:id',validarToken, actualizarAlquiler);
rutaAlquiler.delete('/eliminar/:id', validarToken, eliminarAlquiler);

export default rutaAlquiler;