import { conexion } from "../database/conexion.js"
import { validationResult } from "express-validator"

export const listarVersiones = async (req, res) => {
    try{
        let sql = 'select * from versiones'
        const [result] = await conexion.query(sql)
        console.log(result.length)
        if(result.length > 0){res.status(200).json(result)}
        else res.status(404).json({"message" : "No se encontraron versiones en la base de datos"})
    }
    catch(err){
        res.status(500).json({"message" : "Error en el controlador VersionesController.js " + err})
    }
}

export const registrarVersiones = async (req, res) => { 
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        
        const { version, editable, fk_id_tipo_formato, fk_id_usuarios, formato_vacio, fk_documentos } = req.body;

        const sql = `INSERT INTO versiones (version, editable, fk_id_tipo_formato, fk_id_usuarios, formato_vacio, fk_documentos) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [version, editable, fk_id_tipo_formato, fk_id_usuarios, formato_vacio, fk_documentos];

        const [rows] = await conexion.query(sql, values);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Se registró con éxito la version" });
        } else {
            return res.status(404).json({ "message": "No se registró ningún formato." });
        }
    } catch (e) {
        return res.status(500).json({ "message": "Error: " + e.message });
    }
};

export const eliminarVersiones = async (req, res) => {
    try {
        let id_formato = req.params.id_formato

        let sql = `delete from versiones where id_formato = ${id_formato}`

        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se eliminó con éxito la version."})
        }
        else {
            return res.status(404).json({"message":"No se eliminó la version."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}

export const actualizarVersiones = async (req, res) => {
    try {
        let {version, editable, fk_id_tipo_formato, fk_id_usuarios, formato_vacio, fk_documentos} = req.body
        let id_formato = req.params.id_formato
        let sql = `update versiones set version = '${version}', editable = '${editable}', fk_id_tipo_formato = '${fk_id_tipo_formato}', 
        fk_id_usuarios = '${fk_id_usuarios}', formato_vacio = '${formato_vacio}',
        fk_documentos = '${fk_documentos}' where id_formato = ${id_formato}`

        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se actualizó con éxito el formato."})
        }
        else {
            return res.status(404).json({"message":"No se actualizó el formato."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}

export const ListaridVersiones=async(req,res)=>{
    try {
        let id_formato=req.params.id_formato
        let sql=`select * from versiones where id_formato=${id_formato}`
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