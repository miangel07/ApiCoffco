import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuario, listarUsuarioId, 
    registrarUsuario,ConsultaUsers, estadoUsuario, verificarContraseña, listarRoles, listarClientes} from "../controllers/usuarioController.js";
import { validacionUser } from "../../validation/UsuariosValidator.js";
import { validacionUserActualizar } from "../../validation/UsuariosValidatorUpdate.js";
import { validarToken} from "../controllers/AutentificacionLogin.js";
const rutaUsuario= Router()

rutaUsuario.get('/listar', validarToken, listarUsuario)
rutaUsuario.get('/listarroles', validarToken, listarRoles)
rutaUsuario.get('/listarid/:id', validarToken, listarUsuarioId)
rutaUsuario.post('/registrar', validarToken, registrarUsuario)
rutaUsuario.post('/registrarlogin', registrarUsuario)
rutaUsuario.put('/contra/:id', validarToken, verificarContraseña)
rutaUsuario.delete('/eliminar/:id_usuario', validarToken, eliminarUsuario)
rutaUsuario.put('/estado/:id_usuario', validarToken, estadoUsuario)
rutaUsuario.put('/actualizar/:id', validarToken, validacionUserActualizar, actualizarUsuario)
rutaUsuario.get('/consulta', validarToken, ConsultaUsers)
rutaUsuario.get('/clientes', validarToken, listarClientes)


export default rutaUsuario