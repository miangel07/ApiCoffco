import { Router } from "express";
import { actualizarPrecio, ListaridPrecio, listarPrecios, registrarPrecio, eliminarPrecio} from "../controllers/PrecioController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validatePrecio } from "../../validation/PrecioValidation.js";

const rutaPrecio = Router()

rutaPrecio.get('/listar',validarToken,listarPrecios)
rutaPrecio.post('/registrar', validarToken,validatePrecio, registrarPrecio)
rutaPrecio.delete('/eliminar/:idPrecio',validarToken, eliminarPrecio)
rutaPrecio.put('/actualizar/:idPrecio',validarToken,validatePrecio, actualizarPrecio)
rutaPrecio.get('/listarid/:idPrecio',validarToken, ListaridPrecio)

export default rutaPrecio