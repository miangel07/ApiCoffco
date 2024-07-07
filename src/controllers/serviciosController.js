import { conexion } from "../database/conexion.js"
import { validationResult } from "express-validator"

export const registrarServicio = async (req,res)=>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        let {tipo_servicios,fk_id_muestra,fk_formato}=req.body
        let sql=`insert into servicios (tipo_servicios,fk_id_muestra,fk_formato)values(?,?,?)`  
        const [respuesta]=await conexion.query(sql,[tipo_servicios,fk_id_muestra,fk_formato])
        if(respuesta.affectedRows>0){
            res.status(200).json({message:'Dato registrado con exito'})
        }else{
            res.status(404).json({message:'Dato no registrado'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor'+error.message})
    }
}

export const listarServicios = async (req,res)=>{
    try {
        let sql=`select * from servicios`
        const [resultado]=await conexion.query(sql)
        if(resultado.length>0){
            res.status(200).json(resultado)
        }else{
            res.status(404).json({message:'Datos no encontrados'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor'+error.message})
    }
}

export const listarServiciosId= async (req,res) =>{
    try {
        let id=req.params.id
        let sql=`select * from servicios where id_servicios=?`
        const [respuesta]= await conexion.query(sql,[id])
        if(respuesta.length==1){
            res.status(200).json(respuesta)
        }else{
            res.status(404).json({message:'El dato no existe'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor' +error.message})
    }
}

export const actualizarServicios = async (req,res) =>{
    try {
        let {tipo_servicios,fk_id_muestra,fk_formato}=req.body
        let id = req.params.id
        let sql=`update servicios set tipo_servicios='${tipo_servicios}', fk_id_muestra='${fk_id_muestra}', fk_formato='${fk_formato}'
        where id_servicios=${id}`
        const [respuesta] = await conexion.query(sql)
        if(respuesta.affectedRows>0){
            res.status(200).json({message: 'Datos actualizados con exito'})
        }else{
            res.status(404).json({message: 'Datos no actualizados'})
        } 
    } catch (error) {
        res.status(500).json({message: 'Error en el servidor'+error.message})
    }
}

export const eliminarServicios = async (req,res) =>{
    try {
        let id=req.params.id
        let sql=`delete from servicios where id_servicios='${id}'`
        const [respuesta] = await conexion.query(sql)
        if(respuesta.affectedRows==1){
            res.status(200).json({message: 'Datos eliminados con exito'})
        }else{
            res.status(404).json({message:'Error al eliminar datos'})
        }
    } catch (error) {
        res.status(500).json({message: 'Error en el servidor' + error.message})
    }
}