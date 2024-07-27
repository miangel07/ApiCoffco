import { validationResult } from 'express-validator';
import {conexion} from '../database/conexion.js';


export const registrarVersionesTieneVariables=async(req,res)=>{
    try {
      const error = validationResult(req)
      if(!error.isEmpty()){
        return res.status(400).json(error)
      }
        let {fk_versiones,fk_variables}=req.body
        let sql = `insert into versiones_tiene_variables (fk_versiones,fk_variables)values(?,?)`;
        const [respuesta]=await conexion.query(sql,[fk_versiones,fk_variables])
        if(respuesta.affectedRows==1){
            res.status(200).json({message:'Version y variable registrada con exito'})
        }else{
            res.status(404).json({ message: "Version y variable no registrada" });
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor'+error.message})
    }
}

export const listarVersionesTieneVariables = async (req, res) => {
  try {
    let sql = `
        select 
        vtv.id_versiones_tiene_variables, 
        v.idVersion as 'id de version', 
        v.version as 'nombre version',
        v.nombre_documento as 'nombre documento',
        var.idVariable as 'id de variable',
        var.nombre as 'nombre de variable'
        from 
        versiones_tiene_variables vtv
        join 
        versiones v on vtv.fk_versiones = v.idVersion
        join 
        variables var on vtv.fk_variables = var.idVariable
    `;

    const [respuesta] = await conexion.query(sql);

    if (respuesta.length > 0) {
      res.status(200).json(respuesta);
    } else {
      res.status(404).json({ message: "No hay datos registrados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};

export const listarVersionesTieneVariablesId = async (req,res)=>{
    try {
        let id = req.params.id
        let sql = `select 
        vtv.id_versiones_tiene_variables, 
        v.idVersion as 'id de version', 
        v.version as 'nombre version',
        v.nombre_documento as 'nombre documento',
        var.idVariable as 'id de variable',
        var.nombre as 'nombre de variable'
        from 
        versiones_tiene_variables vtv
        join 
        versiones v on vtv.fk_versiones = v.idVersion
        join 
        variables var on vtv.fk_variables = var.idVariable where id_versiones_tiene_variables = ? `;
        const [respuesta]=await conexion.query(sql,[id])
        if(respuesta.length==1){
            res.status(200).json(respuesta)
        }else{
            res.status(404).json({message:'Referencia de versiones y variables no encontrada'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor'+error.message})
    }
}

export const actualizarVersionesTieneVariables = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    
    let { fk_versiones, fk_variables } = req.body;
    let id= req.params.id
    let sql = `update versiones_tiene_variables set fk_versiones=?,fk_variables=? where id_versiones_tiene_variables=?`;
    const [respuesta] = await conexion.query(sql, [fk_versiones, fk_variables,id]);
    if (respuesta.affectedRows == 1) {
      res
        .status(200)
        .json({ message: "Version y variable actualizadas con exito" });
    } else {
      res.status(404).json({ message: "Version y variable no actualizada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
}

export const eliminarVersionesTieneVariables = async (req, res) => {
  try {
    let id = req.params.id;

    let sql = `delete from versiones_tiene_variables where id_versiones_tiene_variables=?`;
    const [respuesta] = await conexion.query(sql, [id]);

    if (respuesta.affectedRows == 1) {
      res
        .status(200)
        .json({ message: "Version y variable eliminadas con exito" });
    } else {
      res.status(404).json({ message: "Version y variable no eliminadas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};

