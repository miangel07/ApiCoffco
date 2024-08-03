import { Router } from "express";
import { listarfincas, registrarFincas, eliminarfincas, actualizarFincas, ListaridFincas } from "../controllers/FincaController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateFinca } from "../../validation/fincaValidation.js";

const rutaFinca = Router()

rutaFinca.get('/listar',validarToken,listarfincas)
rutaFinca.post('/registrar', validarToken, validateFinca, registrarFincas)
rutaFinca.delete('/eliminar/:id_finca',validarToken, eliminarfincas)
rutaFinca.put('/actualizar/:id_finca',validarToken,validateFinca, actualizarFincas)
rutaFinca.get('/listarid/:id_finca',validarToken, ListaridFincas)

export default rutaFinca