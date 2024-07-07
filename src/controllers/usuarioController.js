import {conexion} from '../database/conexion.js'
import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs';


export const listarUsuario = async (req,res)=>{
    try {
        let sql='select * from usuarios'
        const [resultado]= await conexion.query(sql)
        if(resultado.length>0){
            res.status(200).json(resultado)
        }else{
            res.status(404).json({message:'No se encontraron usuarios'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor'+error.message})
    }

}

export const listarUsuarioId = async (req,res) => {
    try {
        let id_usuario = req.params.id_usuario
        let sql =`select * from usuarios where id_usuario=${id_usuario}`
        const [respuesta] = await conexion.query(sql)
        if(respuesta.length==1){
            res.status(200).json(respuesta)
        }else{
            res.status(404) .json({'message':'El usuario no existe'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor'+error.message})
    }
}

export const registrarUsuario = async (req,res)=>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }
        console.log(req.body)

        
        let{nombre_usuario,apellido_usuario,correo_electronico,telefono_usuario,password,rol_usuario,tipo_documento,numero_identificacion}=req.body
      
        const salt = await bcryptjs.genSalt(10);
        let hashPassword = await bcryptjs.hash(password,salt)
        
        let sql = `insert into usuarios (nombre_usuario,apellido_usuario,correo_electronico,telefono_usuario,rol_usuario,contraseña_usuario,numero_identificacion,tipo_documento)
        value('${nombre_usuario}','${apellido_usuario}','${correo_electronico}','${telefono_usuario}','${rol_usuario}','${hashPassword}','${numero_identificacion}','${tipo_documento}')`;
        const [respuesta]=await conexion.query(sql)
        if(respuesta.affectedRows>0){
            res.status(200).json({message:'Se registro el usuario con exito'})
        }else{
            res.status(404).json({message:'No se pudo registrar el usuario'})
        }
    } catch (error) {
        res.status(500).json({message:'Error'+error.message})

    }
}

export const eliminarUsuario = async (req,res)=>{
    try {
        let id_usuario=req.params.id_usuario
        let sql=`delete from usuarios where id_usuario=${id_usuario}`
        const [respuesta]= await conexion.query(sql)
        if(respuesta.affectedRows>0){
            res.status(200).json({'message':'El usuario se elimiino con exito'})
        }else{
            res.status(404).json({'message':'Error'+error.message})
        }
    } catch (error) {
        res.status(500).json({'message':'Errror'+error.message})
    }
}

export const actualizarUsuario = async (req,res)=>{
    try {
        const salt = await bcryptjs.genSalt(10);

        let id=req.params.id
        let {nombre_usuario,apellido_usuario,correo_electronico,telefono_usuario,rol_usuario,contraseña_usuario,numero_identificacion,tipo_documento}=req.body

        let hashPassword = await bcryptjs.hash(contraseña_usuario,salt)
        console.log(hashPassword)
        let sql=`update usuarios set nombre_usuario='${nombre_usuario}', apellido_usuario='${apellido_usuario}',
        correo_electronico='${correo_electronico}', telefono_usuario='${telefono_usuario}',rol_usuario='${rol_usuario}', 
        contraseña_usuario='${hashPassword}',numero_identificacion=${numero_identificacion},tipo_documento='${tipo_documento}' where id_usuario='${id}'`
    
        const [respuesta]= await conexion.query(sql)

        if(respuesta.affectedRows>0){
            res.status(200).json({'message':'Usuario actualizo'})
        }else{
            res.status(404).json({'message':'Usuario no actualizado'})
        }
        
    } catch (error) {
        res.status(500).json({'message': 'Error'+error.message})
    }

}
export const ConsultaUsers = async(req, res) =>{
    try {
        let sql=`SELECT COUNT(rol_usuario) AS rol
        FROM usuarios
        WHERE rol_usuario = 'administrador'
        GROUP BY rol_usuario`
        let rol 
        const [respuesta] = await conexion.query(sql)
        console.log(respuesta)
       
        
        if(respuesta.length >0){
            res.status(200).json(respuesta)
            
        }else{
            res.status(404).json({message:'No se encontraron usuarios'})
        }
    } catch (error) {
        
    }
}