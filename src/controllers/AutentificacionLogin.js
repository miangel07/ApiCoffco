
import { conexion } from "../database/conexion.js"
import { validationResult } from "express-validator"
import bcryptjs from 'bcryptjs';

import jwt from"jsonwebtoken"


export const validarToken=async(req,res,next)=>{
let token_user=req.headers['token']
if(!token_user){
    res.status(402).json({"mensaje":"se requiere un token"})
}
else{
    const decode =jwt.verify(token_user,process.env.SECRET,(Error,decode)=>{
        if(Error){

            res.status(401).json({"mensaje":"token invalido"})
        }
        else {
            next()
        }
    })
}
}

export const validarUsuarios = async (req, res) => {

    try {
        const error= validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        let { id: numero_identificacion,password: contraseña_usuario } = req.body
        
        // Consulta para obtener el hash de la contraseña del usuario desde la base de datos
        let sql =`SELECT nombre_usuario, rol_usuario, contraseña_usuario FROM usuarios WHERE numero_identificacion='${numero_identificacion}'`
        const [resultado] = await conexion.query(sql);
      

        if (resultado.length > 0) {
            const user = resultado[0];
            const storedPasswordHash = user.contraseña_usuario;

            // Comparación de la contraseña proporcionada con el hash almacenado en la base de datos
            const passwordMatch = await bcryptjs.compare(contraseña_usuario, storedPasswordHash);

            if (passwordMatch) {
                // Contraseña válida: se genera un token de autenticación
                let token = jwt.sign({user:resultado},process.env.SECRET,{expiresIn:process.env.TIME})
                return res.status(200).json({ user: { nombre_usuario: user.nombre_usuario, rol_usuario: user.rol_usuario }, token, message: 'Usuario autorizado' });
            } else {
                // Contraseña no válida
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            // No se encontró un usuario con el correo proporcionado
            return res.status(404).json({ message: 'Contraseña o Numero de Indentificacion incorrectos' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor' + error.message });
}}

