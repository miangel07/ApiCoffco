import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator"

export const ListarVariables = async(req,res) => {
    try {
        
        let sql = "select * from variables"
        const [respuesta] = await conexion.query(sql)

        if (respuesta.length>0){
            res.status(200).json(respuesta);  
        }else{
            res.status(404).json({message:'No hay variables registradas'});  
        } 
    }
    catch (error) {
        res.status(500).json({message:"error en la conexion"+error})
    }
}
export const RegistrarVariables=async(req,res)=> {
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }
        let {nombre,estado} = req.body;
        console.log(nombre,estado)
        let sql = `insert into variables (nombre,estado) values (?,?)`;
        const [respuesta] = await conexion.query(sql,[nombre,estado])
        if(respuesta.affectedRows>0){
            return res.status(200).json({menssage:"Variable registrada exitosamente"})
        }
        else {
            return res.status(404).json({mensagge:"Variable no registrada"})
        }
    } catch (error) {
        return res.status(500).json({menssage:"error en el servidor"+error.message})
    }
}

export const ListarIdVariables=async(req,res)=> {
    try {
        let id=req.params.id

        let sql=`select * from variables where idVariable=?`
        const [respuesta] = await conexion.query(sql,[id])
        if (respuesta.length == 1){

            res.status(200).json(respuesta)
        }
        else {
            res.status(404).json({message:"Variable no encontrada"})

        }
    } catch (error) {
        res.status(500).json({menssage:"Error en el servidor" +error.message})
    }
}

export const ActualizarVariables = async(req,res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
          return res.status(400).json(error);
        }
        
        let { nombre, estado } = req.body;

        let id = req.params.id;

        let sql = `update variables set nombre=?, estado=? where idVariable=?`;
        const [respuesta] = await conexion.query(sql, [nombre, estado, id]);
        if (respuesta.affectedRows > 0) {
            return res
            .status(200)
            .json({ message: "se actualizo con exito la variable" });
        } else {
            return res
            .status(404)
            .json({ message: "no se actualizo la variable" });
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor '+error.mensage})
    }
}

export const ELiminarVariables= async(req,res)=>{
    try {
        let id=req.params.id

        let sql = `delete from variables where idVariable=?`
        const [respuesta] = await conexion.query(sql,[id])

        if (respuesta.affectedRows>0){
            res.status(200).json({message:"Variable eliminada correctamente"})
        }
        else {
            res.status(404).json({message:"Variable no eliminada correctamente"})
        }
    } catch (error) {
        res.status(500).json({message:"error en el servidor "+error.mensage})
    }
}
