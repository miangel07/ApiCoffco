import { Router } from "express";
import { listarfincas, registrarFincas, eliminarfincas, actualizarFincas, ListaridFincas } from "../controllers/FincaController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
const rutaFinca = Router()

rutaFinca.get('/listar',validarToken,listarfincas)
rutaFinca.post('/registrar',validarToken, registrarFincas)
rutaFinca.delete('/eliminar/:id_finca',validarToken, eliminarfincas)
rutaFinca.put('/actualizar/:id_finca',validarToken, actualizarFincas)
rutaFinca.get('/listarid/:id_finca',validarToken, ListaridFincas)

export default rutaFinca