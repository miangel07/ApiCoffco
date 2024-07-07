import { json } from "express"
import { conexion } from "../database/conexion.js"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"

export const listarDocumentos = async (req, res) => {

    try{
        let sql = 'select * from documentos'
        const [result] = await conexion.query(sql)
        console.log(result.length)
        if(result.length > 0){res.status(200).json(result)}
        else res.status(404).json({"message" : "No se encontraron docuementos  en la base de datos"})
    }
    catch(err){

        res.status(500).json({"message" : "Error" + err})
    }
}

export const registrarDocumentos = async (req, res) => {
    try {

        const error= validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }
        let {nombre, fecha_carga,  fk_id_usuarios, descripcion,formato,archivo} = req.body
        console.log(nombre, fecha_carga,  fk_id_usuarios, descripcion,formato)

        let sql = `insert into documentos (nombre, fecha_carga, fk_id_usuarios, descripcion,formato,archivo )
        values ('${nombre}','${fecha_carga}','${fk_id_usuarios}','${descripcion}','${formato}','${archivo}')`
        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se registró con éxito el documentos"})
        } 
        else {
            return res.status(404).json({"message":"No se registró el documentos."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}

export const eliminarDocumentos = async (req, res) => {
    try {
        let id_documentos = req.params.id_documentos

        let sql = `delete from documentos where id_documentos = ${id_documentos}`

        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se eliminó con éxito el documentos."})
        }
        else {
            return res.status(404).json({"message":"No se eliminó el documentos."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}

export const actalizardocumentos = async (req, res) => {
    try {
      
        let {nombre, fecha_carga,  fk_id_usuarios,  descripcion,formato,estado} = req.body
        let id_documentos = req.params.id_documentos
        let sql = `update documentos set nombre = '${nombre}', fecha_carga = '${fecha_carga}', 

        fk_id_usuarios = '${fk_id_usuarios}', descripcion = '${descripcion}', formato = '${formato}',estado = '${estado}' where id_documentos = ${id_documentos}`


        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se actualizó con éxito el documentos."})
        }
        else {
            return res.status(404).json({"message":"No se actualizó el documentos."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}


export const buscarDocumentos =async(req,res)=>{


        try {
            let sql='SELECT * FROM documentos WHERE id_documentos = ?'
            const id = req.params.id
            const [documentoRows] = await conexion.query(sql, id)
    
            if (documentoRows.length > 0) {
                return res.status(200).json(documentoRows)
            } else {
                return res.status(404).json({ "message": "No se ha encontrado el documento solicitado."})
            }
        } catch (error) {
            res.status(500).json({"message" : "Error " +error.message}) 
    
        }
    }


export const ListaridDocumentos=async(req,res)=>{
    try {
    
      
        let id_documentos=req.params.id_documentos
        let sql=`select * from documentos where id_documentos=${id_documentos}`
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




    export const editarEstadoDocumento = async (req, res) => {
        try {
    //con esta valirable trae el token de la cabecera 
        let token = req.headers.token;
        //decodifica el token y lo guarda en la variable decodedToken
            let decodedToken = jwt.decode(token);
            // mira como trae la decodificacion y la trae en objeto 
            console.log(decodedToken);
            // decode accede al array dentro del objeo y con user[0] que es el array accede al poscicion 0 y trae id_documentos y lo alamcena en rol 
            // ya con ese rol se dan los permisos 
        let rol =decodedToken.user[0].rol_usuario
     
        const id_documentos = req.params.id_documentos
        const { estado } = req.body;
            if (rol != "administrador"){
                return res.status(401).json({"message" : "No tienes permisos para realizar esta acción."})
            }
            else {
                if (estado!= "activo" && estado!= "inactivo") {
                    return res.status(400).json({"message" : "El estado del documento debe ser activo o inactivo."})
                }
                let sql = `update documentos set estado ='${estado}' where id_documentos = ${id_documentos}`
                const [rows] = await conexion.query(sql)
                if(rows.affectedRows > 0){
                    return res.status(200).json({"message":"Se actualizó con éxito el estado del documento."})
                }
                else {
                    return res.status(404).json({"message":"No se actualizó el estado del documento."})
                }
            }
         

        }catch(err){
            res.status(500).json({"message" : "Error" + err})
        }
      
       
      }
