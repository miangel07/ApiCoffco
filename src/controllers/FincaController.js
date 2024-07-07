import { conexion } from "../database/conexion.js"
import { validationResult } from "express-validator"

export const listarfincas = async (req, res) => {
    try{
        let sql = 'select * from finca'
        const [result] = await conexion.query(sql)
        console.log(result.length)
        if(result.length > 0){res.status(200).json(result)}
        else res.status(404).json({"message" : "No se encontraron fincas en la base de datos"})
    }
    catch(err){
        res.status(500).json({"message" : "Error en el controlador FincaController.js " + err})
    }
}

export const registrarFincas = async (req, res) => {
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }

        let {nombre_finca, fk_id_municipio, fk_id_usuario} = req.body

        let sql = `insert into finca (nombre_finca, fk_id_municipio, fk_id_usuario)
        values ('${nombre_finca}','${fk_id_municipio}','${fk_id_usuario}')`
        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se registró con éxito la finca"})
        } 
        else {
            return res.status(404).json({"message":"No se registró la finca."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}

export const eliminarfincas = async (req, res) => {
    try {
        let id_finca = req.params.id_finca

        let sql = `delete from finca where id_finca = ${id_finca}`

        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se eliminó con éxito la finca"})
        }
        else {
            return res.status(404).json({"message":"No se eliminó la finca."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}

export const actualizarFincas = async (req, res) => {
    try {
        let id_finca = req.params.id_finca;
        let { nombre_finca, fk_id_municipio, fk_id_usuario } = req.body;

        let sql = `UPDATE finca SET nombre_finca = ?, fk_id_municipio = ?, fk_id_usuario = ? WHERE id_finca = ?`;
        let values = [nombre_finca, fk_id_municipio, fk_id_usuario, id_finca];

        const [rows] = await conexion.query(sql, values);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Se actualizó con éxito la finca" });
        } else {
            return res.status(404).json({ "message": "No se actualizó la finca." });
        }
    } catch (e) {
        return res.status(500).json({ "message": "error " + e.message });
    }
}


export const ListaridFincas=async(req,res)=>{
    try {
        let id_finca=req.params.id_finca
        let sql=`select * from finca where id_finca=${id_finca}`
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