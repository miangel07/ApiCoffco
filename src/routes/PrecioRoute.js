import { Router } from "express";
import { actualizarPrecio, ListaridPrecio, listarPrecios, registrarPrecio, eliminarPrecio} from "../controllers/PrecioController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validatePrecio } from "../../validation/PrecioValidation.js";

const rutaPrecio = Router()

rutaPrecio.get('/listar',listarPrecios)
rutaPrecio.post('/registrar',validatePrecio, registrarPrecio)
rutaPrecio.delete('/eliminar/:idPrecio', eliminarPrecio)
rutaPrecio.put('/actualizar/:idPrecio',validatePrecio, actualizarPrecio)
rutaPrecio.get('/listarid/:idPrecio', ListaridPrecio)

export default rutaPrecio