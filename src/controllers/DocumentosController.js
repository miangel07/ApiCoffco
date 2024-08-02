import { json } from "express";
import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const listarDocumentos = async (req, res) => {
  try {
    let sql = "select * from documentos";
    const [result] = await conexion.query(sql);
    console.log(result.length);
    if (result.length > 0) {
      res.status(200).json(result);
    } else
      res.status(404).json({
        message: "No se encontraron docuementos  en la base de datos",
      });
  } catch (err) {
    res.status(500).json({ message: "Error" + err });
  }
};
/* nombre	fecha_carga	descripcion	codigo_documentos	fecha_emision	fk_idTipoServicio	fk_idTipoDocumento	fk_idLogos	
 */
export const registrarDocumentos = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    let {
      nombre,
      fecha: fecha_carga,
      descripcion,
      codigo: codigo_documentos,
      fecha_emision,
      servicios: fk_idTipoServicio,
      tipo_documento: fk_idTipoDocumento,
      logo: fk_idLogos
    } = req.body;

    let sql = `insert into documentos (nombre, fecha_carga,descripcion,codigo_documentos,	fecha_emision	,fk_idTipoServicio,	fk_idTipoDocumento ,fk_idLogos)
        values ('${nombre}','${fecha_carga}','${descripcion}','${codigo_documentos}','${fecha_emision}','${fk_idTipoServicio}','${fk_idTipoDocumento}','${fk_idLogos}')`;
    const [rows] = await conexion.query(sql);
    if (rows.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Se registró con éxito el documentos" });
    } else {
      return res.status(404).json({ message: "No se registró el documentos." });
    }
  } catch (e) {
    return res.status(500).json({ message: "error " + e.message });
  }
};

export const eliminarDocumentos = async (req, res) => {
  try {
    let id_documentos = req.params.id_documentos;
    let sql = `delete from documentos where id_documentos = ${id_documentos}`;

    const [rows] = await conexion.query(sql);
    if (rows.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Se eliminó con éxito el documentos." });
    } else {
      return res.status(404).json({ message: "No se eliminó el documentos." });
    }
  } catch (e) {
    return res.status(500).json({ message: "error " + e.message });
  }
};

export const actalizardocumentos = async (req, res) => {
  try {
    let {
      nombre,
      fecha: fecha_carga,
      descripcion,
      codigo: codigo_documentos,
      fecha_emision,
      servicios: fk_idServicios,
      tipo_documento: fk_idTipoDocumento,
      logo: fk_idLogos
    } = req.body;
    let id_documentos = req.params.id_documentos;
    let sql = `update documentos set nombre ='${nombre}', fecha_carga = '${fecha_carga}', 
         descripcion = '${descripcion}',codigo_documento='${codigo_documentos}',
        fecha_emision='${fecha_emision},servicios=${fk_idServicios},tipo_documento=${fk_idTipoDocumento},logo=${fk_idLogos}
         where id_documentos = ${id_documentos}`;

    const [rows] = await conexion.query(sql);
    if (rows.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Se actualizó con éxito el documentos." });
    } else {
      return res
        .status(404)
        .json({ message: "No se actualizó el documentos." });
    }
  } catch (e) {
    return res.status(500).json({ message: "error " + e.message });
  }
};

export const buscarDocumentos = async (req, res) => {
  try {
    let sql = "SELECT * FROM documentos WHERE id_documentos = ?";
    const id = req.params.id;
    const [documentoRows] = await conexion.query(sql, id);

    if (documentoRows.length > 0) {
      return res.status(200).json(documentoRows);
    } else {
      return res
        .status(404)
        .json({ message: "No se ha encontrado el documento solicitado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error " + error.message });
  }
};

