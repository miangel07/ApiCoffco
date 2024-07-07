import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator"


export const listarDetalle = async (req,res) => {
    try {
        let sql = `select * from detalle`
        const [respuesta] = await conexion.query(sql)

        if(respuesta.length>0){
            res.status(200).json(respuesta)
        }else{
            res.status(404).json({message:'No hay datos registrados'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor' +error.message})
    }
}

export const listarDetalleId = async (req,res) =>{
    try {
        let id=req.params.id
        let sql=`select * from detalle where id_detalle= ${id}`
        const [respuesta]= await conexion.query(sql)
        if(respuesta.length==1){
            res.status(200).json(respuesta)
        }else{
            res.status(404).json({message:'El dato no existe'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor' +error.message})
    }
}

export const registrarDetalle = async (req,res) =>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        let {fk_id_formato,fk_id_datos,valor,fk_id_servicios}=req.body
        let sql=`insert into detalle (fk_id_formato,fk_id_datos,valor,fk_id_servicios)
        values('${fk_id_formato}','${fk_id_datos}','${valor}','${fk_id_servicios}')`
        const [respuesta] =await conexion.query(sql)
        if(respuesta.affectedRows==1){
            res.status(200).json({message:'Dato ingresado con exito'})
        }else{
            res.status(404).json({message:'Datos no registrados'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor'+error.message})
    }
}

export const actualizarDetalle = async (req,res) =>{
    try {
        let {fk_id_formato,fk_id_datos,valor,fk_id_servicios}=req.body
        let id = req.params.id
        let sql=`update detalle set fk_id_formato='${fk_id_formato}', fk_id_datos='${fk_id_datos}', valor='${valor}', fk_id_servicios='${fk_id_servicios}'
        where id_detalle=${id}`
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

export const eliminarDetalle = async (req,res) =>{
    try {
        let id=req.params.id
        let sql=`delete from detalle where id_detalle=${id}`
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