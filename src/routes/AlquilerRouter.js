import { Router } from "express";
import { actualizarAlquiler, eliminarAlquiler, getAlquiler, registrarAlquiler, usuariosParaAlquiler } from "../controllers/AlquilerController.js";


const rutaAlquiler = Router()

rutaAlquiler.get('/listar',getAlquiler)
rutaAlquiler.get('/listarus',usuariosParaAlquiler)
rutaAlquiler.post('/registrar',registrarAlquiler)
rutaAlquiler.put('/actualizar/:id', actualizarAlquiler);
rutaAlquiler.delete('/eliminar/:id', eliminarAlquiler);

export default rutaAlquiler;