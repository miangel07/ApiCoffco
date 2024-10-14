import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuario, listarUsuarioId, registrarUsuario,ConsultaUsers, estadoUsuario, verificarContraseña, listarRoles} from "../controllers/usuarioController.js";
import { validacionUser } from "../../validation/UsuariosValidator.js";
import { validacionUserActualizar } from "../../validation/UsuariosValidatorUpdate.js";
import { validarToken} from "../controllers/AutentificacionLogin.js";
const rutaUsuario= Router()

rutaUsuario.get('/listar', listarUsuario)
rutaUsuario.get('/listarroles', listarRoles)
rutaUsuario.get('/listarid/:id', listarUsuarioId)
rutaUsuario.post('/registrar', validacionUser, registrarUsuario)
rutaUsuario.put('/contra/:id', verificarContraseña)
rutaUsuario.delete('/eliminar/:id_usuario',  eliminarUsuario)
rutaUsuario.put('/estado/:id_usuario',estadoUsuario)
rutaUsuario.put('/actualizar/:id', validacionUserActualizar, actualizarUsuario)
rutaUsuario.get('/consulta',ConsultaUsers)

export default rutaUsuario