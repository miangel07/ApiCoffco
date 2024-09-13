import { Router } from "express";
import { listarfincas, registrarFincas, eliminarfincas, actualizarFincas, ListaridFincas } from "../controllers/FincaController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateFinca } from "../../validation/fincaValidation.js";

const rutaFinca = Router()

rutaFinca.get('/listar', listarfincas)
rutaFinca.post('/registrar', validateFinca, registrarFincas)
rutaFinca.delete('/eliminar/:id_finca', eliminarfincas)
rutaFinca.put('/actualizar/:id_finca', validateFinca, actualizarFincas)
rutaFinca.get('/listarid/:id_finca', ListaridFincas)

export default rutaFinca