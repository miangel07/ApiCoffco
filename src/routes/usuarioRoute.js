import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuario, listarUsuarioId, registrarUsuario,ConsultaUsers } from "../controllers/usuarioController.js";
import { validacionUser } from "../../validation/UsuariosValidator.js";
import { validarToken} from "../controllers/AutentificacionLogin.js";
const rutaUsuario= Router()

rutaUsuario.get('/listar',validarToken, listarUsuario)
rutaUsuario.get('/listarid/:id_usuario',validarToken, listarUsuarioId)
rutaUsuario.post('/registrar',validacionUser,registrarUsuario)
rutaUsuario.delete('/eliminar/:id_usuario',validarToken,  eliminarUsuario)
rutaUsuario.put('/actualizar/:id', validarToken,validacionUser,actualizarUsuario)
rutaUsuario.get('/consulta',validarToken,ConsultaUsers)



export default rutaUsuario  