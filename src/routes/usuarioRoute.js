<<<<<<< HEAD
import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuario, listarUsuarioId, registrarUsuario,ConsultaUsers } from "../controllers/usuarioController.js";
import { validacionUser } from "../../validation/UsuariosValidator.js";
import { validarToken} from "../controllers/AutentificacionLogin.js";
const rutaUsuario= Router()

rutaUsuario.get('/listar', listarUsuario)
rutaUsuario.get('/listarid/:id_usuario',validarToken, listarUsuarioId)
rutaUsuario.post('/registrar',registrarUsuario)
rutaUsuario.delete('/eliminar/:id_usuario',validarToken,  eliminarUsuario)
rutaUsuario.put('/actualizar/:id', validarToken,validacionUser,actualizarUsuario)
rutaUsuario.get('/consulta',validarToken,ConsultaUsers)



=======
import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuario, listarUsuarioId, registrarUsuario,ConsultaUsers } from "../controllers/usuarioController.js";
import { validacionUser } from "../../validation/UsuariosValidator.js";
import { validarToken} from "../controllers/AutentificacionLogin.js";
const rutaUsuario= Router()

rutaUsuario.get('/listar', listarUsuario)
rutaUsuario.get('/listarid/:id_usuario',validarToken, listarUsuarioId)
rutaUsuario.post('/registrar',validarToken,registrarUsuario)
rutaUsuario.delete('/eliminar/:id_usuario',validarToken,  eliminarUsuario)
rutaUsuario.put('/actualizar/:id', validarToken,validacionUser,actualizarUsuario)
rutaUsuario.get('/consulta',validarToken,ConsultaUsers)



>>>>>>> 60b19c509f6d3b695fbf98cc9c372aedd6e8e5ab
export default rutaUsuario  