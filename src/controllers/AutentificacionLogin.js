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

        let { id: numero_documento, password: password } = req.body

        let sql = `
            SELECT u.id_usuario, u.nombre, u.numero_documento, u.apellidos, r.rol AS rol, u.estado, u.correo_electronico, u.telefono, u.tipo_documento, u.password 
            FROM usuarios u
            JOIN rol r ON u.fk_idRol = r.idRol
            WHERE u.numero_documento = '${numero_documento}'
        `;

        const [resultado] = await conexion.query(sql);
      
        if (resultado.length > 0) {
            const usuario = resultado[0];
            const storedPasswordHash = usuario.password;

            if (usuario.estado === 'inactivo') {
                return res.status(403).json({ "message": "Acceso denegado" });
            }

            const passwordMatch = await bcryptjs.compare(password, storedPasswordHash);

            if (passwordMatch) {
                const { password, ...DatosSesion } = usuario;

                let token = jwt.sign({Usuario: DatosSesion},process.env.SECRET,{expiresIn:process.env.TIME})
                return res.status(200).json({ Usuario_Logeado: { id: usuario.id_usuario, nombre: usuario.nombre, apellido: usuario.apellidos, rol: usuario.rol, estado: usuario.estado, correo: usuario.correo_electronico, telefono: usuario.telefono, documento: usuario.numero_documento, tipo_documento: usuario.tipo_documento }, token, message: 'Usuario autorizado' });
            } else {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            return res.status(404).json({ message: 'Contraseña o Numero de Indentificacion incorrectos' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor' + error.message });
}}