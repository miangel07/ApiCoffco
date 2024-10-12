import { Router } from "express";
import { actualizarAlquiler, getAlquiler, registrarAlquiler, usuariosParaAlquiler } from "../controllers/AlquilerController.js";


const rutaAlquiler = Router()

rutaAlquiler.get('/listar',getAlquiler)
rutaAlquiler.get('/listarus',usuariosParaAlquiler)
rutaAlquiler.post('/registrar',registrarAlquiler)
rutaAlquiler.put('/actualizar/:id', actualizarAlquiler);




export default rutaAlquiler;