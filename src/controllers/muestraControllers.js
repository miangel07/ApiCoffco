import {conexion} from "../database/conexion.js"
import { validationResult } from "express-validator"

export const ListarMuestras =async(req,res)=>{
    try {
    let sql="select * from muestra"
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
export const RegistrarMuestra=async(req,res)=>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        let {cantidad,fk_id_finca,fecha_muestra}=req.body
        let sql =`insert into muestra(cantidad,fk_id_finca,fecha_muestra)
        values('${cantidad}','${fk_id_finca}','${fecha_muestra}')`
        const [respuesta]=await conexion.query(sql)
        if(respuesta.affectedRows>0){
            return res.status(200).json({"menssage":"se registro correctamente "})

        }
        else{
            return res.status(404).json({"message":"no se registro correctamente"})

        }
    } catch (error) {
        return res.status(500).json({"message":"error al conectar la base de datos "+error.message})
    }
}
export const ActualizarMuestra=async(req,res)=>{
    try {
        let {id_muestra,cantidad,fk_id_finca,fecha_muestra}=req.body
        let id=req.params.id
        let sql=`update muestra set id_muestra='${id_muestra}', cantidad='${cantidad}',fk_id_finca='${fk_id_finca}',fecha_muestra='${fecha_muestra}' where id_muestra=${id}`
        const [responde]=await conexion.query(sql)
        if(responde.affectedRows>0){
            return res.status(200).json({"message":"se actualizo con exito "})
        }
        else{
            return res.status(404).json({"message":"no se actualizo correctamente"})
        }
        
    } catch (error) {
        res.status(500).json({"message":"error en la conexion"+error.menssage})
    }

}
export const EliminarMuestra= async(req,res)=>{
    try {
        let id=req.params.id
        let sql =`delete from muestra where id_muestra=${id}`
        const [responde]=await conexion.query(sql)
        if(responde.affectedRows>0){
            res.status(200).json({"message":"dato eliminado correctamente"})
        }
        else{
            res.status(404).json({"message":"dato  no se elimino correctamente"})
        }  
    } catch (error) {
        res.status(500).json({"message":"error en la conexion"+error.menssage})
    }
}
export const ListaridMuestra=async(req,res)=>{
try {
    let id=req.params.id
    let sql=`select * from muestra where id_muestra=${id}`
    const [responde]= await conexion.query(sql)
    if(responde.length == 1){
        res.status(200).json(responde)
    }
    else{
        res.status(500).json({"message":"dato no encontrado"})
    }
    
} catch (error) {
    res.status(500).json({"menssage":"error en la conexion"+error.menssage})
}
}