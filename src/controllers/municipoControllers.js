import {conexion} from "../database/conexion.js"
import { validationResult } from "express-validator"

export const ListarMunicipio =async(req,res)=>{
    try {
    let sql="select * from municipio"
    const [responde] = await conexion.query(sql)
    if(responde.length>0){
        res.status(200).json(responde)
    }
       else{
        res.status(404).json({"menssage":"no se pudo listar correctamente"})
       }
    } catch (error) {
        res.status(500).json({"menssage":"error en la conexion"+error.menssage})
    }
}

export const RegistrarMunicipio=async(req,res)=>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }
        
        let {nombre_municipio}=req.body
        let sql =`insert into municipio (nombre_municipio) values('${nombre_municipio}')`
        const [respuesta]=await conexion.query(sql)
        if(respuesta.affectedRows>0){
            return res.status(200).json({"menssage":"el dato se registro correctamente"})
        }
        else{
            return res.status(404).json({"message":"el dato no se registro"})
        }
    } catch (error) {
        return res.status(500).json({"message":"error al conectar la base de datos"})
    }
}
export const ActualizarMunicipio=async(req,res)=>{
    
    let {id_municipio,nombre_municipio}=req.body
    let id=req.params.id
    let sql=`update muestra set id_municipio='${id_municipio}', nombre_municipio='${nombre_municipio} where id_muestra=${id}`
    const [responde]=await conexion.query(sql)
    
    if(responde.affectedRows>0){
        return res.status(200).json({"message":"se actualizo con exito el usuario"})
    }
    else{
        return res.status(404).json({"message":"no se actualizo el usuario"})
    } 
}
export const EliminarMunicipio= async(req,res)=>{
    try {
        let id=req.params.id
        let sql =`delete from muestra where id_municipio=${id}`
        const [responde]=await conexion.query(sql)
        if(responde.affectedRows>0){
            res.status(200).json({"message":"usuario eliminado correctamente"})
        }
        else{
            res.status(404).json({"message":"usuario no eliminado correctamente"})
        }  
    } catch (error) {
        res.status(500).json({"message":"error en la conexion"+error.menssage})
    }
}
export const ListaridMunicipio=async(req,res)=>{
    try {
        let id=req.params.id
        let sql=`select * from muestra where id_municipio=${id}`
        const [responde]= await conexion.query(sql)
        if(responde.length == 1){
            res.status(200).json(responde)
        }
        else{
            res.status(404).json({"message":"usuario no encontrado"})
        }
        
    } catch (error) {
        res.status(500).json({"menssage":"error en la conexion en la base de datos "+error.menssage})
    }
    }
